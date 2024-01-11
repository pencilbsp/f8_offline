import * as Yup from "yup"

import userModel from "../models/user"

export async function getUsers(req, res, next) {
  try {
    const email = req.query.email?.trim()
    const status = req.query.status

    const users = await userModel.all({ status, email })
    const messages = req.flash("message")
    res.render("user/index", { users, message: messages?.[0] })
  } catch (error) {
    next(error)
  }
}

export async function addUserGet(req, res, next) {
  try {
    res.render("user/add", { req, mode: "add" })
  } catch (error) {
    next(error)
  }
}

export async function addUserPost(req, res, next) {
  try {
    const data = await req.validate(req.body, {
      id: Yup.string().nullable(),
      name: Yup.string().required("Tên bắt buộc phải nhập"),
      email: Yup.string()
        .email("Email không đúng định dạng")
        .required("Email bắt buộc phải nhập")
        .test({
          name: "exists-email",
          exclusive: true, // Chỉ chạy kiểm tra nếu trường id không được cung cấp
          message: "Email đã được sử dụng",
          test: async function (value) {
            if (this.parent.id) return true
            const existsUser = await userModel.getUserByEmail(value)
            // Kiểm tra chỉ khi trường id không được cung cấp (undefined hoặc null)
            return !existsUser
          },
        }),
      status: Yup.string().oneOf(["0", "1"], "Trạng thái không hợp lệ"),
    })

    if (!data) return res.redirect("/users/add")

    if (!data.id) {
      delete data.id
      await userModel.addUser({ ...data, status: data.status === "1" })
      req.flash("message", "Thêm người dùng mới thành công")
    } else {
      data.id = Number(data.id)
      console.log({ ...data, status: data.status === "1" })
      await userModel.updateUser({ ...data, status: data.status === "1" })
      req.flash("message", "Cậpt nhật thông tin người dùng thành công")
    }
    res.redirect("/users")
  } catch (error) {
    next(error)
  }
}

export async function deleteUser(req, res, next) {
  try {
    const userId = req.params.id
    await userModel.deleteUser(userId)
    req.flash("message", "Đã xoá người dùng thành công")
    res.redirect("/users")
  } catch (error) {
    next(error)
  }
}

export async function editUser(req, res, next) {
  try {
    const userId = req.params.id
    const existsUser = await userModel.getUserById(+userId)

    if (!existsUser) throw new Error("Người dùng không tồn tại")

    req.preFormData = existsUser
    res.render("user/add", { req, mode: "edit" })
  } catch (error) {
    next(error)
  }
}
