import * as Yup from "yup"

const loginScheme = Yup.object().shape({
  email: Yup.string().email("Email không hợp lệ").required("Email khônh được bỏ trống"),
  password: Yup.string().required("Mật khẩu không được bỏ trống"),
})

export const authController = {
  login(req, res) {
    // res.send(`<h1>Đăng nhập</h1>`)
    const message = req.flash("message")
    return res.render("auth/login", { layout: "layouts/auth-layout", message })
  },
  async handleLogin(req, res) {
    try {
      const body = req.body
      await loginScheme.validate(body, { stripUnknown: true, abortEarly: false })
    } catch (error) {
      console.log(error.inner)
      const errors = error.inner.map((e) => ({ path: e.path, message: e.message }))
      console.log(errors)
      req.flash("message", error.message)
      return res.redirect("/dang-nhap")
    }
  },
}
