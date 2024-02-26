import passport from "passport"
import { Router } from "express"

import { loginGET } from "../controllers/auth.js"

const authRoutes = Router()

authRoutes.get("/google/redirect", passport.authenticate("google"))
authRoutes.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/login", failureFlash: true })
)
authRoutes.get("/login", loginGET)
authRoutes.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/auth/login",
    failureFlash: true,
    badRequestMessasge: "Vui lòng nhập email và mật khẩu",
    successRedirect: "/",
  }),
  (req, res) => {
    res.json({ status: "success", user: req.user })
  }
)

authRoutes.get("/logout", (req, res) => {
  req.logOut((error) => {})
  res.redirect("/auth/login")
})

export default authRoutes
