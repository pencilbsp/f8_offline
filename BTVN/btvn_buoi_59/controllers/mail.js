import { randomUUID } from "crypto"
import { createTransport } from "nodemailer"
import prisma from "../prisma/prisma.js"

function sendMail(id, data) {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await prisma.user.findUnique({ where: { id } })

      const transporter = createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: user.email,
          pass: user.password,
        },
      })

      const mailId = randomUUID()
      const options = {
        to: data.to,
        html: `<div style="width: 100%; height: 100%;">
          <p>${data.text}</p>
          <img src="https://tracking.pendev.cc/tracking.gif?id=${mailId}" alt="" style="width: 1px; height: 1px; visibility: hidden;" />
        </div>`,
        from: user.email,
        subject: data.subject,
      }

      transporter.sendMail(options, function (error, info) {
        transporter.close()
        if (error) return reject(error)
        return resolve({ info, sent: { ...options, id: mailId } })
      })
    } catch (error) {
      return reject(error)
    }
  })
}

export async function POST(req, res) {
  try {
    const userId = req.session.user.id
    const { sent } = await sendMail(userId, req.body)
    await prisma.sent.create({
      data: {
        id: sent.id,
        to: sent.to,
        user_id: userId,
        content: sent.text,
        subject: sent.subject,
      },
    })

    req.flash(message, "Đã gửi mail thành công")
    res.redirect("/mail")
  } catch (error) {
    req.flash(error, error.message)
    res.redirect("/mail")
  }
}
