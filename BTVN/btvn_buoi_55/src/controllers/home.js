export function GET(req, res) {
  res.render("index", { user: req.session.user })
}
