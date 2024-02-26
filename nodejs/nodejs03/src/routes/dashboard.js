import { Router } from "express"
import { GET as dashboardGet } from "../controllers/dashboard/home.js"
import { GET as usersDshboardGet } from "../controllers/dashboard/users.js"
import { GET as rolesDashboardGet } from "../controllers/dashboard/roles/index.js"
import { GET as createRolesDashboardGet, POST as createRolesDashboard } from "../controllers/dashboard/roles/create.js"

const dashboardRoutes = Router()

dashboardRoutes.get("/", dashboardGet)
dashboardRoutes.get("/users", usersDshboardGet)
dashboardRoutes.get("/roles", rolesDashboardGet)
dashboardRoutes.get("/roles/create", createRolesDashboardGet)
dashboardRoutes.post("/roles/create", createRolesDashboard)

export default dashboardRoutes
