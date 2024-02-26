import passport from "passport"
import Express from "express"
import flash from "connect-flash"
import cookieParser from "cookie-parser"
import expressEjsLayouts from "express-ejs-layouts"
import session, { MemoryStore } from "express-session"

import { PORT } from "./config.js"
import routes from "./routes/index.js"
import { User } from "./database/models/index.js"
import passportLocal from "./passports/passport.local.js"
import passportGoogle from "./passports/passport.google.js"

const sessionStore = new MemoryStore()

const app = Express()

app.use(Express.json())
app.use(Express.urlencoded({ extended: false }))

app.set("view engine", "ejs")
app.set("views", "src/views")

app.use(expressEjsLayouts)

app.use(
  session({
    resave: "true",
    store: sessionStore,
    saveUninitialized: true,
    secret: "Thật là bí mật",
  })
)

app.use(cookieParser())
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(async function (id, done) {
  const user = await User.findByPk(id)
  done(null, user)
})

passport.use("local", passportLocal)
passport.use("google", passportGoogle)

app.use(routes)

app.listen(PORT)
