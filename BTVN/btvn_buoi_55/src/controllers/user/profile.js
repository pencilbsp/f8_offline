import prisma from "../../utils/prisma.js"
import { formatDate, formatToNow } from "../../utils/format.js"

export async function GET(req, res, next) {
  try {
    // console.log(req.sessionID)
    const user = await prisma.user.findUnique({
      where: { id: req.session.user_id },
      select: {
        name: true,
        email: true,
        verified: true,
        created_at: true,
      },
    })

    const sessions = await prisma.session.findMany({
      where: {
        user_id: user.id,
      },
      select: {
        id: true,
        sid: true,
        device: true,
        location: true,
        updated_at: true,
        created_at: true,
      },
    })

    const error = req.flash("error")?.[0] || ""
    const message = req.flash("message")?.[0] || ""

    res.render("profile", {
      error,
      message,
      user: user,
      sessions: sessions.map((s) => ({
        ...s,
        device: JSON.parse(s.device),
        time: formatDate(s.created_at),
        current: s.sid === req.sessionID,
        updated_at: formatToNow(s.updated_at),
      })),
    })
  } catch (error) {
    next(error)
  }
}
