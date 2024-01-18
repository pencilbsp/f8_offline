import * as Yup from "yup"
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
