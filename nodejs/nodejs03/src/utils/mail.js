import nodemailer from "nodemailer"

const trasnporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "pencil.bsp@gmail.com",
    pass: "",
  },
})

export default function sendMail(to, subject, message) {
  return trasnporter.sendMail({
    from: "",
    to: to,
    subject: subject,
    html: message,
  })
}
