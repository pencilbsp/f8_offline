export function authMiddleware(req, res, next) {
  if (!req.user) {
    res.redirect("/auth/login")
  } else {
    next()
  }
}

export function guestMiddleware(req, res, next) {
  if (req.user) {
    res.redirect("/")
  } else {
    next()
  }
}
