import { join } from "path"
import express from "express"
import session from "express-session"
import flash from "connect-flash"
import expressLayouts from "express-ejs-layouts"

import routers from "./routes"
import validate from "./middlewares/validate"
import { APP_PORT, SESSION_SECRET } from "./configs"

const viewDir = join(process.cwd(), "views")

const app = express()

app.set("view engine", "ejs")
app.set("views", viewDir)
app.use(expressLayouts)

app.use(express.static("public"))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
)

app.use(flash())
app.use(validate)

app.use(routers)

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send(err.message)
})

app.listen(APP_PORT, () => {
  console.log(`Listening on port ${APP_PORT}...`)
})
