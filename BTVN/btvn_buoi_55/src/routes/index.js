import { Router } from "express"
import authRoutes from "./auth.js"
import { rootPaths } from "./paths.js"

import authGuard from "../middlewares/auth-guard.js"

import { GET as homePage } from "../controllers/home.js"
import { GET as userProfileGet } from "../controllers/user/profile.js"

const appRoutes = Router()

appRoutes.use(authRoutes)

appRoutes.get(rootPaths.home, homePage)
appRoutes.get(rootPaths.profile, authGuard, userProfileGet)

export default appRoutes
