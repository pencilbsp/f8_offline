import { sign, verify } from "jsonwebtoken"
import { JWT_ACCESS_TOKEN_EXPIRE, JWT_ACCESS_TOKEN_SECRET } from "../config.js"

export const generateAccessToken = (payload) => {
  return sign(payload, JWT_ACCESS_TOKEN_SECRET, { expiresIn: JWT_ACCESS_TOKEN_EXPIRE })
}

export const verifyToken = (accessToken) => {
  return verify(accessToken, JWT_ACCESS_TOKEN_SECRET)
}
