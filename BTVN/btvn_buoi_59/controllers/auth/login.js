import prisma from "../../prisma/prisma.js"

export async function POST(req, res) {
  try {
    const email = req.body.email
    const password = req.body.password

    const name = req.body.name || email.split("@")[0]
    const user = await prisma.user.upsert({
      where: {
        email,
      },
      update: {
        name,
        password,
      },
      create: {
        name,
        email,
        password,
      },
    })

    req.session.user = {
      id: user.id,
      email: user.email,
    }

    res.redirect("/mail")
  } catch (error) {
    console.log(error)
    res.redirect("/")
  }
}
