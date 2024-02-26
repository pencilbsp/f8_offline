export const getProfile = async (req, res) => {
  try {
    console.log(req.user)
    res.json({ user: req.user })
  } catch (error) {
    return res.status(error.statusCode || 401).json({ error: { message: error.message } })
  }
}
