import { ErrorResponse } from "../../../utils/error"
import { User, Blacklist } from "../../../database/models"

export default async function logout(req, res, next) {
  try {
    const accessToken = req.user.accessToken

    await Blacklist.findOrCreate({
      where: { token: accessToken },
      default: { token: accessToken, expired: req.user.exp },
    })

    return res.json({ message: "Logout successfully" })
  } catch (error) {
    return res.status(error.statusCode || 500).json({ error: { message: error.message } })
  }
}
