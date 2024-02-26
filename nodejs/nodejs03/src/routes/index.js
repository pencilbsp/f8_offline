import { Router } from "express"

import apiRoutes from "./api.js"
import userRoutes from "./user.js"
import authRoutes from "./auth.js"
import dashboardRoutes from "./dashboard.js"

import { authMiddleware, guestMiddleware } from "../middlewares/auth.js"

const routes = Router()

routes.use("/auth", guestMiddleware, authRoutes)

routes.get("/", authMiddleware, (req, res) => {
  res.render("index", { user: req.user })
})
routes.use("/users", authMiddleware, userRoutes)
routes.use("/dashboard", authMiddleware, dashboardRoutes)
routes.use("/api", apiRoutes)

export default routes
