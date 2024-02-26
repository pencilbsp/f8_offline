import { Router } from "express"
import login from "../controllers/apis/auth/login.js"
import logout from "../controllers/apis/auth/logout.js"
import authApiMiddleware from "../middlewares/api/auth.js"
import { getProfile } from "../controllers/apis/auth/profile.js"

const apiRoutes = Router()

apiRoutes.post("/v1/auth/login", login)
apiRoutes.post("/v1/auth/logout", authApiMiddleware, logout)
apiRoutes.get("/v1/auth/profile", authApiMiddleware, getProfile)

export default apiRoutes
