import prisma from "../../utils/prisma.js"
import { authPaths, rootPaths } from "../../routes/paths.js"

export function GET(req, res) {
  req.session.destroy((err) => {
    if (err) {
      console.error(err)
    } else {
      res.redirect(authPaths.login)
    }
  })
}

export async function POST(req, res, next) {
  try {
    if (!req.body.ids) return res.redirect(rootPaths.profile)

    const sessionIds = Array.isArray(req.body.ids) ? req.body.ids : [req.body.ids]

    let count = 0
    for (const sessionId of sessionIds) {
      if (sessionId === req.sessionID) continue

      await prisma.session.delete({ where: { sid: sessionId } })
      count++
    }

    if (count > 0) {
      req.flash("message", `Đăng đăng xuất thành công ${count} phiên`)
    }

    res.redirect(rootPaths.profile)
  } catch (error) {
    next(error)
  }
}
