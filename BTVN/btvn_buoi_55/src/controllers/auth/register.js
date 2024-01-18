import { genSalt, hash } from "bcryptjs"

import prisma from "../../utils/prisma.js"
import { registerSchema } from "../../schemas/auth.js"

export async function GET(req, res) {
  res.render("auth/register", { validateFallback: req.validateFallback })
}

export async function POST(req, res) {
  try {
    const data = await req.validate(registerSchema, req.body)
    if (!data) throw new Error("")

    const salt = await genSalt(10)
    data.password = await hash(data.password, salt)

    await prisma.user.create({ data })

    if (req.validateFallback.formData.password) {
      delete req.validateFallback.formData.password
    }

    return res.render("auth/register", {
      validateFallback: req.validateFallback,
      message: "Đăng ký tài khoản thành công",
    })
  } catch (error) {
    return res.render("auth/register", {
      error: { message: error.message },
      validateFallback: req.validateFallback,
    })
  }
}
