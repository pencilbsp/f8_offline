import { compare } from "bcryptjs"

import prisma from "../../utils/prisma.js"
import { rootPaths } from "../../routes/paths.js"
import { loginSchema } from "../../schemas/auth.js"
import { TIME_TO_USER_ACTIVE } from "../../../configs.js"

export async function GET(req, res) {
  res.render("auth/login", { validateFallback: req.validateFallback })
}

export async function POST(req, res) {
  try {
    const data = await req.validate(loginSchema, req.body)
    if (!data) throw new Error()

    const user = await prisma.user.findUnique({ where: { email: data.email } })

    const isCorrect = await compare(data.password, user.password)
    if (!isCorrect) throw new Error("Mật khẩu không chính xác")

    const avtiveTime = new Date(user.created_at).getTime()
    // Sau {TIME_TO_USER_ACTIVE} giờ đăng kí tài khoản không kích hoạt thì ko cho đăng nhập
    if (Date.now() - TIME_TO_USER_ACTIVE) {
      throw new Error("Tài khoản chưa được kích hoạt")
    }

    req.session.user = { email: user.email, id: user.id }
    res.redirect(rootPaths.profile)
  } catch (error) {
    return res.render("auth/login", {
      error: { message: error.message },
      validateFallback: req.validateFallback,
    })
  }
}
