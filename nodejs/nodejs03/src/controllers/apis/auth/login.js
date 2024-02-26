import { compare } from "bcrypt"
import { User } from "../../../database/models"
import { ErrorResponse } from "../../../utils/error"
import { generateAccessToken } from "../../../utils/jwt"

export default async function login(req, res, next) {
  try {
    const email = req.body.email
    const password = req.body.password

    if (!email || !password) throw new ErrorResponse(400, "Bad request")

    const user = await User.findOne({ where: { email } })
    if (!user) throw new ErrorResponse(404, "User not found")

    const isMatchPassword = await compare(user.password, password)
    // console.log({ isMatchPassword })
    // if (!isMatchPassword) throw new ErrorResponse(400, "Password wrong")

    const accessToken = generateAccessToken({ sub: user.id })
    return res.json({ accessToken })
  } catch (error) {
    return res.status(error.statusCode).json({
      errors: { message: error.message },
    })
  }
}
