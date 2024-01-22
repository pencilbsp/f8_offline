import { Store } from "express-session"
import { PrismaClient } from "@prisma/client"

export default class PrismaStore extends Store {
  /**
   *
   * @param {PrismaClient} prismaClient
   * @param {any} options
   */
  constructor(prismaClient, options = {}) {
    super(options)
    this.prismaClient = prismaClient
  }

  async get(sid, callback) {
    try {
      const session = await this.prismaClient.session.findUnique({ where: { sid } })
      if (!session) {
        callback()
        return
      }

      if (new Date().valueOf() >= session.expires_at.valueOf()) {
        await this.prismaClient.session.delete({ where: { sid } })
        callback()
        return
      }

      const data = {
        user_id: session.user_id,
        device: JSON.parse(session.device),
        cookie: JSON.parse(session.cookie),
        expires: session.expires_at.getTime(),
      }

      callback(null, data)
    } catch (error) {
      callback(error)
    }
  }

  async set(sid, session, callback) {
    try {
      if (!session.user_id) {
        callback()
        return
      }

      const data = JSON.parse(JSON.stringify(session))

      const sessionData = {
        sid: sid,
        user_id: data.user_id,
        device: JSON.stringify(data.device),
        cookie: JSON.stringify(data.cookie),
        expires_at: new Date(data.cookie.expires),
      }

      await this.prismaClient.session.upsert({
        where: {
          sid: sid,
        },
        create: sessionData,
        update: {
          cookie: sessionData.cookie,
          expires_at: sessionData.expires_at,
        },
      })

      callback()
    } catch (error) {
      callback(error)
    }
  }

  async clear(callback) {
    try {
      await this.prismaClient.session.deleteMany()
    } catch (error) {
      callback(error)
    }
  }

  async destroy(sid, callback) {
    try {
      await this.prismaClient.session.delete({ where: { sid } })
      callback()
    } catch (error) {
      callback(error)
    }
  }
}
