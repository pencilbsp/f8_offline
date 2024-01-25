export async function POST(req, res) {
  await req.session.destroy()
  res.redirect("/")
}
