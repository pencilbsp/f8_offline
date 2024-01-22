import prisma from "../../utils/prisma.js"
import { rootPaths } from "../../routes/paths.js"
import { TIME_TO_USER_ACTIVE } from "../../../configs.js"

export async function POST(req, res) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.session.user_id,
      },
    })

    if (user.verified) return res.redirect(rootPaths.profile)

    const avtiveTime = new Date(user.created_at).getTime()

    // Nếu tài khoản đăng kí lâu hơn {TIME_TO_USER_ACTIVE} giờ thì ko cho kích hoạt
    if (Date.now() - avtiveTime > TIME_TO_USER_ACTIVE) {
      throw new Error("Đã quá thời gian kích hoạt tài khoản")
    }

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        verified: new Date(),
      },
    })

    req.flash("message", "Kích hoạt tài khoản thành công")
    res.redirect(rootPaths.profile)
  } catch (error) {
    req.flash("error", error.message)
    res.redirect(rootPaths.profile)
  }
}
