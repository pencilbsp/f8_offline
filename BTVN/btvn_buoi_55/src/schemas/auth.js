import * as Yup from "yup"
import { compare } from "bcryptjs"
import prisma from "../utils/prisma.js"

export const loginSchema = {
  email: Yup.string()
    .required("Vui lòng nhập email")
    .email("Email không đúng định dạng")
    .test("checkEmailNotfound", "Email này chưa được đăng ký", async (email) => {
      const existEmail = await prisma.user.findUnique({ where: { email } })
      return Boolean(existEmail)
    }),
  password: Yup.string().required("Vui lòng nhập mật khẩu").min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
}

export const registerSchema = {
  email: Yup.string()
    .required("Vui lòng nhập email")
    .email("Email không đúng định dạng")
    .test("checkEmailUnique", "Email này đã được đăng ký", async (email) => {
      const existEmail = await prisma.user.findUnique({ where: { email } })
      return !Boolean(existEmail)
    }),
  password: Yup.string().required("Vui lòng nhập mật khẩu").min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  name: Yup.string().required("Vui lòng nhập họ tên").min(2, "Tên phải có ít nhất 2 ký tự"),
}

export const resetPasswordSchema = {
  userId: Yup.string().required("Không thể đổi mật khẩu lúc này"),
  password: Yup.string()
    .required("Vui lòng nhập mật khẩu hiện tại")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .test("checkCorrectPassword", "Mật khẩu hiện tại không đúng", async (password, context) => {
      try {
        const user = await prisma.user.findUnique({ where: { id: +context.parent.userId } })
        const isCorrect = await compare(password, user.password)
        if (!isCorrect) throw new Error("Mật khẩu không chính xác")

        return true
      } catch (error) {
        return false
      }
    }),
  newPassword: Yup.string()
    .required("Vui lòng nhập mật khẩu mới")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .test("checkSamePassword", "Mật khẩu mới phải khác mật khẩu cũ", (newPassword, context) => {
      return newPassword !== context.parent.password
    }),
  logout: Yup.string().oneOf(["", "on"]),
}
