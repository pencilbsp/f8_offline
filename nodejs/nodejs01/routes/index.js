import { Router } from "express"

import { userRoutes } from "./user.js"

import { authController } from "../controllers/auth.controller.js"
import { homeController } from "../controllers/home.controller.js"

export const routes = Router()

routes.get("/", homeController.home)

routes.use("/user", userRoutes)

routes.get("/dang-nhap", authController.login)
routes.post("/dang-nhap", authController.handleLogin)
