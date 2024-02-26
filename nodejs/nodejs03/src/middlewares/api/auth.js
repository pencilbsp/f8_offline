import { verifyToken } from "../../utils/jwt"
import { ErrorResponse } from "../../utils/error"
import { User, Blacklist } from "../../database/models"

export default async function authApiMiddleware(req, res, next) {
  try {
    const accessToken = req.get("Authorization")?.split(" ")?.[1]
    if (!accessToken) throw new ErrorResponse(401)

    const isBlocked = await Blacklist.findOne({ where: { token: accessToken } })
    if (isBlocked) throw new ErrorResponse(401, "Token blocked")

    const { sub, exp } = verifyToken(accessToken)
    const user = await User.findByPk(sub, { attributes: { exclude: "password" } })

    if (!user.status) throw new ErrorResponse(403, "User blocked")

    req.user = { ...user, accessToken, exp }
    next()
  } catch (error) {
    return res.status(error.statusCode || 500).json({ error: { message: error.message } })
  }
}
