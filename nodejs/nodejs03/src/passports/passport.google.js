import { User, Provider } from "../database/models/index"

import { Strategy } from "passport-google-oauth2"

const googleStrategy = new Strategy(
  {
    clientID: "305161849322-mtfiimrh0jfi0e0uvmu2k0fundt6fe25.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:5001/auth/google/callback",
    scope: ["profile", "email"],
  },
  async function (request, acessToken, refreshToken, profile, done) {
    const { displayName: name, email } = profile

    const [provider] = await Provider.findOrCreate({
      where: { name: "google" },
      default: { name: "google" },
    })

    const [user] = await User.findOrCreate({
      where: { email },
      default: {
        name,
        email,
        status: true,
        profile_id: provider.id,
      },
    })

    done(null, user)
  }
)

export default googleStrategy
