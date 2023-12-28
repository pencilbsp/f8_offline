export const userController = {
  user(req, res) {
    const userId = req.params.userId
    // return res.send(`Xin chào user ${userId}`)
    return res.render("user/index", { userId })
  },
}
