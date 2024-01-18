import { Router } from "express"

import { authPaths } from "./paths.js"

import authGuard from "../middlewares/auth-guard.js"
import guestGuard from "../middlewares/guest-guard.js"

import { GET as logoutGet } from "../controllers/auth/logout.js"
import { POST as activeUserPost } from "../controllers/auth/active.js"
import { GET as loginGet, POST as loginPost } from "../controllers/auth/login.js"
import { GET as registerGet, POST as registerPost } from "../controllers/auth/register.js"

const authRoutes = Router()

// authRoutes.use((req, res, next) => {
//   req.app.set("layout", "auth-layout")
//   next()
// })

authRoutes.get(authPaths.logout, logoutGet)

authRoutes.get(authPaths.login, guestGuard, loginGet)
authRoutes.post(authPaths.login, guestGuard, loginPost)

authRoutes.get(authPaths.register, guestGuard, registerGet)
authRoutes.post(authPaths.register, guestGuard, registerPost)

authRoutes.post(authPaths.active, authGuard, activeUserPost)

export default authRoutes
