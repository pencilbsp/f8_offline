import Express from "express"
import expressEjsLayouts from "express-ejs-layouts"

import { PORT } from "./config.js"
import routes from "./routes/index.js"

const app = Express()

app.use(Express.json())
app.use(Express.urlencoded({ extended: false }))

app.set("view engine", "ejs")
app.set("views", "src/views")

app.use(expressEjsLayouts)

app.use(routes)

app.listen(PORT)
