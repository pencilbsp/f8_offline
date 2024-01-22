import { authPaths } from "../routes/paths.js"

export default function authGuard(req, res, next) {
  if (req.session.user_id) {
    next()
  } else {
    res.redirect(authPaths.login)
  }
}
