import { Router } from "express"
import { createUser, editUserGet, editUserPost, listUsers, deleteUser } from "../controllers/user.js"

const userRoutes = Router()

userRoutes.get("/", listUsers)
userRoutes.post("/create", createUser)
userRoutes.get("/create", (req, res) => res.render("users/create", { user: {} }))
userRoutes.post("/delete", deleteUser)
userRoutes.get("/:userId", editUserGet)
userRoutes.post("/:userId", editUserPost)

export default userRoutes
