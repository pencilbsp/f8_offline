export async function loginGET(req, res) {
  const error = req.flash("error")
  res.render("auth/login", { error })
}

export async function loginPOST(req, res) {
  res.render("auth/login")
}
