import { Op } from "sequelize"
import { User } from "../database/models/index.js"

export async function listUsers(req, res, next) {
  try {
    const status = req.query.status === "1"
    const keywords = req.query.keywords?.trim()

    const where = { status }

    if (keywords)
      where[Op.or] = {
        name: {
          [Op.iLike]: `%${keywords}%`,
        },
        email: {
          [Op.iLike]: `%${keywords}%`,
        },
      }

    const users = await User.findAll({
      order: [["id", "desc"]],
      where: where,
    })

    res.render("users/index", { users, query: req.query })
  } catch (error) {
    next(error)
  }
}

export async function createUser(req, res, next) {
  try {
    const name = req.body.name?.trim()
    const email = req.body.email?.trim()
    const status = req.body.status === "1"

    const user = await User.create({
      name,
      email,
      status,
    })

    res.redirect("/users")
  } catch (error) {
    next(error)
  }
}

export async function editUserPost(req, res, next) {
  try {
    const userId = req.params.userId
    const user = await User.findByPk(Number(userId))

    if (!user) throw new Error("Người dùng không tồn tại")

    console.log(req.body)

    const name = req.body.name?.trim()
    const email = req.body.email?.trim()
    const status = req.body.status === "1"


    await User.update(
      {
        name,
        email,
        status,
      },
      {
        where: { id: user.id },
      }
    )

    res.redirect(`/users/${user.id}`)
  } catch (error) {
    next(error)
  }
}

export async function editUserGet(req, res, next) {
  try {
    const userId = req.params.userId
    const user = await User.findByPk(Number(userId))

    if (!user) throw new Error("Người dùng không tồn tại")

    res.render(`users/create`, { user: user.dataValues })
  } catch (error) {
    next(error)
  }
}

export async function deleteUser(req, res, next) {
  try {
    const userId = req.body.id
    await User.destroy({ where: { id: Number(userId) } })

    res.redirect("/users")
  } catch (error) {
    next(error)
  }
}
