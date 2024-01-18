import { rootPaths } from "../routes/paths.js"

export default function guestGuard(req, res, next) {
  if (req.session.user) {
    res.redirect(rootPaths.profile)
  } else {
    next()
  }
}
