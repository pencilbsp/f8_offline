import { Router } from "express"

import { authPaths } from "./paths.js"

import authGuard from "../middlewares/auth-guard.js"
import guestGuard from "../middlewares/guest-guard.js"

import { POST as activeUserPost } from "../controllers/auth/active.js"
import { GET as loginGet, POST as loginPost } from "../controllers/auth/login.js"
import { GET as logoutGet, POST as logoutPost } from "../controllers/auth/logout.js"
import { GET as registerGet, POST as registerPost } from "../controllers/auth/register.js"
import { GET as resetPasswordGet, POST as resetPasswordPost } from "../controllers/auth/reset-password.js"

const authRoutes = Router()

// authRoutes.use((req, res, next) => {
//   req.app.set("layout", "auth-layout")
//   next()
// })

authRoutes.get(authPaths.resetPassword, authGuard, resetPasswordGet)
authRoutes.post(authPaths.resetPassword, authGuard, resetPasswordPost)

authRoutes.get(authPaths.logout, authGuard, logoutGet)
authRoutes.post(authPaths.logout, authGuard, logoutPost)

authRoutes.get(authPaths.login, guestGuard, loginGet)
authRoutes.post(authPaths.login, guestGuard, loginPost)

authRoutes.get(authPaths.register, guestGuard, registerGet)
authRoutes.post(authPaths.register, guestGuard, registerPost)

authRoutes.post(authPaths.active, authGuard, activeUserPost)

export default authRoutes
