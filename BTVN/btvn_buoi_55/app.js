import Express from "express"
import flash from "connect-flash"
import session from "express-session"
import cookieParser from "cookie-parser"
import expressEjsLayouts from "express-ejs-layouts"

// configs
import { APP_PORT, COOKIE_SECRET, STATIC_DIR, VIEW_DIR } from "./configs.js"
// routes
import appRoutes from "./src/routes/index.js"
// middlewares
import validate from "./src/middlewares/validate.js"

const sessionStore = new session.MemoryStore()

const app = Express()

app.use(Express.static(STATIC_DIR))

app.use(Express.json())
app.use(Express.urlencoded({ extended: false }))

app.set("view engine", "ejs")
app.set("views", VIEW_DIR)

app.use(expressEjsLayouts)
// app.set("layout", "layout")

app.use(cookieParser(COOKIE_SECRET))
app.use(
  session({
    cookie: { maxAge: 1 * 60 * 60 * 1000 },
    store: sessionStore,
    saveUninitialized: true,
    resave: "true",
    secret: "secret",
  })
)

app.use(flash())

app.use(validate)
app.use(appRoutes)

app.listen(APP_PORT, () => console.log(`Server listening on: http://localhost:${APP_PORT}`))
