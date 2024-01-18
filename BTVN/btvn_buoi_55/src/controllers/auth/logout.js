import { authPaths } from "../../routes/paths"

export function GET(req, res) {
  console.log("logout")
  req.session.destroy((err) => {
    if (err) {
      console.error(err)
    } else {
      res.redirect(authPaths.login)
    }
  })
}
