import { genSalt, hash } from "bcryptjs"

import prisma from "../../utils/prisma.js"
import { resetPasswordSchema } from "../../schemas/auth.js"
import { authPaths, rootPaths } from "../../routes/paths.js"

export function GET(req, res) {
  const error = req.flash("error")?.[0] || ""
  const message = req.flash("message")?.[0] || ""

  return res.render("auth/reset-password", {
    error,
    message,
    user: req.session.user_id,
    validateFallback: req.validateFallback,
  })
}

export async function POST(req, res, next) {
  try {
    const data = await req.validate(resetPasswordSchema, req.body)

    if (!data)
      return res.render("auth/reset-password", {
        user: req.session.user_id,
        validateFallback: req.validateFallback,
      })

    const salt = await genSalt(10)
    const password = await hash(data.newPassword, salt)

    await prisma.user.update({
      where: {
        id: +data.userId,
      },
      data: {
        password: password,
      },
    })

    if (data.logout === "on") {
      await prisma.session.deleteMany({
        where: {
          user_id: +data.userId,
          sid: {
            notIn: [req.sessionID],
          },
        },
      })
    }

    req.flash("message", "Mật khẩu đã được đổi thành công")
    res.redirect(rootPaths.profile)
  } catch (error) {
    req.flash("error", error.message)
    res.redirect(authPaths.resetPassword)
  }
}
