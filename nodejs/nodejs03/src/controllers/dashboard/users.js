export function GET(req, res) {

  return res.render("dashboard/users", { layout: "dashboard-layout" })
}