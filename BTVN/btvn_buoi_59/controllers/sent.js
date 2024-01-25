import prisma from "../prisma/prisma"
import { formatDate, formatToNow } from "../utils/format.js"

export async function GET(req, res) {
  try {
    const user = req.session.user
    const list = await prisma.sent.findMany({
      where: {
        user_id: user.id,
      },
    })

    res.render("sent", {
      data: list.map((i) => ({
        ...i,
        created_at: formatToNow(i.created_at),
        seen_at: i.seen_at ? formatDate(i.seen_at, "HH:mm d 'thg' L yyyy") : "Chưa đọc",
      })),
      user,
    })
  } catch (error) {
    res.render("sent", { data: [], user, error: error.message })
  }
}
