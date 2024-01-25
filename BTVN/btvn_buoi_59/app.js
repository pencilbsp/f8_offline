import Express from "express"
import flash from "connect-flash"
import cookieParser from "cookie-parser"
import expressEjsLayouts from "express-ejs-layouts"
import session, { MemoryStore } from "express-session"

import authGuard from "./middlewares/auth-guard.js"
import guestGuard from "./middlewares/guest-guard.js"
import { POST as handleMail } from "./controllers/mail.js"
import { APP_PORT, COOKIE_SECRET, SESSION_EXPIRES_TIME } from "./config.js"
import { POST as handleLogin } from "./controllers/auth/login.js"
import { POST as handleLogout } from "./controllers/auth/logout.js"
import { GET as handleTrackingMail } from "./controllers/tracking.js"
import { GET as listSentEmail } from "./controllers/sent.js"

const sessionStore = new MemoryStore()

const app = Express()

app.use(Express.static("public"))

app.use(Express.json())
app.use(Express.urlencoded({ extended: false }))

app.set("view engine", "ejs")
app.set("views", "views")

app.use(expressEjsLayouts)

app.use(cookieParser(COOKIE_SECRET))
app.use(
  session({
    resave: "true",
    store: sessionStore,
    secret: COOKIE_SECRET,
    saveUninitialized: true,
    cookie: { maxAge: SESSION_EXPIRES_TIME, httpOnly: true, secure: false },
  })
)

app.use(flash())

app.get("/", guestGuard, (req, res) => res.render("index"))

app.post("/mail", authGuard, handleMail)
app.get("/mail", authGuard, (req, res) => {
  const error = req.flash("error")?.[0]
  const message = req.flash("message")?.[0]
  res.render("mail", { user: req.session.user, error, message })
})

app.get("/sent", authGuard, listSentEmail)

app.get("/login", guestGuard, (req, res) => res.redirect("/"))
app.post("/login", guestGuard, handleLogin)

app.post("/logout", authGuard, handleLogout)

app.get("/tracking.gif", handleTrackingMail)

app.listen(APP_PORT)
