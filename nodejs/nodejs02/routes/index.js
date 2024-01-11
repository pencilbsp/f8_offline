import { Router } from "express"
import userRoutes from "./user"

const routers = Router()

routers.use("/users", userRoutes)

export default routers
