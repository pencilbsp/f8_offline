import { Router } from "express"

import { addUserGet, addUserPost, deleteUser, editUser, getUsers } from "../controllers/user"

const userRoutes = Router()

userRoutes.get("/", getUsers)
userRoutes.get("/add", addUserGet)
userRoutes.post("/add", addUserPost)
userRoutes.get("/delete/:id", deleteUser)
userRoutes.get("/:id", editUser)

export default userRoutes
