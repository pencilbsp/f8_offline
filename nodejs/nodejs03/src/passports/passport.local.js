import { compareSync } from "bcrypt"
import { Strategy } from "passport-local"

import { User } from "../database/models/index.js"

const localStrategy = new Strategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async function (email, password, done) {
    const user = await User.findOne({ where: { email } })
    if (!user) {
      return done(null, false, {
        message: "Tài khoản không tồn tại",
      })
    }

    if (!compareSync(password, user.password)) {
      return done(null, false, {
        message: "Mật khẩu không chính xác",
      })
    }

    return done(null, user)
  }
)

export default localStrategy
