import prisma from "../../utils/prisma.js"

export async function GET(req, res) {
  const user = await prisma.user.findUnique({
    where: { id: req.session.user.id },
    select: {
      name: true,
      email: true,
      verified: true,
      created_at: true,
    },
  })

  const error = req.flash("error")?.[0] || ""
  const message = req.flash("message")?.[0] || ""

  res.render("profile", { user: user, error, message })
}
