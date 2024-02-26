export function GET(req, res) {

  return res.render("dashboard/home", { layout: "dashboard-layout" })
}