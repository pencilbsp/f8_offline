import express from "express"
import flash from "connect-flash"
import bodyParser from "body-parser"
import session from "express-session"
import expressLayouts from "express-ejs-layouts"

import { routes } from "./routes/index.js"

const app = express()

app.use(
  session({
    secret: "FROM_PENCIL_WITH_LOVE",
    saveUninitialized: true,
    resave: true,
  })
)
app.use(flash())

app.use(express.static("public"))

app.set("view engine", "ejs")
app.set("views", "./views")
app.use(expressLayouts)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(routes)

const port = 8080
app.listen(port, () => console.log(`Server listing on port ${port}`))
