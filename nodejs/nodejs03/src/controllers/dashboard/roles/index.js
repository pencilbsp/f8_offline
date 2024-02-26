export function GET(req, res) {
  return res.render("dashboard/roles/index", { layout: "dashboard-layout" })
}