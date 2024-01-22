import { Router } from "express"

import { User, Post, Course } from "../database/models/index.js"
import { createUser, editUserGet, editUserPost, listUsers, deleteUser } from "../controllers/user.js"

const userRoutes = Router()

userRoutes.get("/", listUsers)
userRoutes.post("/create", createUser)
userRoutes.get("/create", async (req, res) => {
  const courses = await Course.findAll({
    order: [["name", "desc"]],
  })

  res.render("users/create", { user: {}, courses })
})
userRoutes.post("/delete", deleteUser)
userRoutes.get("/test-assoc", async (req, res) => {
  // const user = await User.findByPk(1)
  // const posts = await user.getPosts()
  // res.json({ user, posts })

  const users = await User.findOne({
    where: {
      id: 1,
    },
    include: {
      model: Post,
    },
  })

  res.json(users)
})
userRoutes.get("/:userId", editUserGet)
userRoutes.post("/:userId", editUserPost)

export default userRoutes
