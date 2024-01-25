export default function guestGuard(req, res, next) {
  if (req.session.user) {
    res.redirect("/sent")
  } else {
    next()
  }
}
