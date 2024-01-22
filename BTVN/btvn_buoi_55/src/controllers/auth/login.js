import { compare } from "bcryptjs"
import { UAParser } from "ua-parser-js"

import prisma from "../../utils/prisma.js"
import { rootPaths } from "../../routes/paths.js"
import { loginSchema } from "../../schemas/auth.js"
import { SESSION_EXPIRES_TIME, TIME_TO_USER_ACTIVE } from "../../../configs.js"

export async function GET(req, res) {
  res.render("auth/login", { validateFallback: req.validateFallback })
}

export async function POST(req, res) {
  try {
    const data = await req.validate(loginSchema, req.body)
    if (!data) throw new Error()

    const user = await prisma.user.findUnique({ where: { email: data.email } })

    const avtiveTime = new Date(user.created_at).getTime()
    // Sau {TIME_TO_USER_ACTIVE} giờ đăng kí tài khoản không kích hoạt thì ko cho đăng nhập
    if (!user.verified && Date.now() - avtiveTime > TIME_TO_USER_ACTIVE) {
      throw new Error("Tài khoản chưa được kích hoạt")
    }

    const isCorrect = await compare(data.password, user.password)
    if (!isCorrect) throw new Error("Mật khẩu không chính xác")

    const { browser, os } = new UAParser(req.get("User-Agent")).getResult()

    req.session.user_id = user.id
    req.session.device = { os, browser }

    res.redirect(rootPaths.profile)
  } catch (error) {
    return res.render("auth/login", {
      error: { message: error.message },
      validateFallback: req.validateFallback,
    })
  }
}
// s%3Ahx16Wro2lYbCyzAaq32sTK46oV1pHWiq.uFsndWlQni%2BJqfrpVx2Nde03HaAxnmr6hL5gXqqe39s
