import * as Yup from "yup"

export default function validate(req, res, next) {
  req.validateFallback = { errors: {}, formData: {} }
  req.validate = async function (roles, body, options = { stripUnknown: true, abortEarly: false }) {
    req.validateFallback.formData = body
    try {
      const schema = Yup.object().shape(roles)
      const data = await schema.validate(body, options)

      return data
    } catch (error) {
      req.validateFallback.errors = Object.fromEntries(error.inner.map((item) => [item.path, item.message]))
    }
  }

  next()
}
