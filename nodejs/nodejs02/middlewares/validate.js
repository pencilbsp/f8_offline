import * as Yup from "yup"

export default function validate(req, res, next) {
  req.validate = async (data, rules = {}) => {
    // console.log(rules)
    const schema = Yup.object(rules)
    try {
      const body = await schema.validate(data, { abortEarly: false })

      return body
    } catch (error) {
      // console.log("error", Object.fromEntries(error.inner.map((item) => [item.path, item.message])))
      const errors = Object.fromEntries(error.inner.map((item) => [item.path, item.message]))
      req.flash("errors", errors)
      req.flash("pre-form-data", data)
    }
  }

  const errors = req.flash("errors")
  req.errors = errors.length ? errors[0] : {}

  const preFormData = req.flash("pre-form-data")
  req.preFormData = preFormData.length ? preFormData[0] : {}
  next()
}
