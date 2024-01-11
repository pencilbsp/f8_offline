import sql from "../libs/db"

const userModel = {
  all({ status, email } = {}) {
    let filter = sql`WHERE name IS NOT NULL `
    if (["active", "inactive"].includes(status)) {
      filter = sql`${filter} AND status=${status === "active"} `
    }

    if (email) {
      filter = sql`${filter} AND LOWER(email) LIKE ${`%${email}%`}`
    }

    return sql`SELECT * FROM users ${filter}`
  },
  async getUserById(id) {
    const users = await sql`SELECT * FROM users WHERE id=${id}`
    return users?.[0]
  },
  async getUserByEmail(email) {
    const users = await sql`SELECT * FROM users WHERE email=${email}`
    return users?.[0]
  },
  async addUser(data) {
    const { name, email, status } = data
    const newUsers = await sql`
      INSERT INTO users(name, email, status)
      VALUES(${name}, ${email}, ${status})
      RETURNING *
    `
    return newUsers?.[0]
  },
  async deleteUser(userId) {
    await sql`DELETE FROM users WHERE id=${userId}`
  },
  async updateUser({ id, name, status }) {
    await sql`
      UPDATE users
      SET name=${name}, status=${status}
      WHERE id=${id}
      `
  },
}

export default userModel
