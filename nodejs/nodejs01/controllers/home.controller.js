export const homeController = {
  home(req, res) {
    const status = true
    const title = "<i>Học backend dễ hơn fontend</i>"

    const users = ["User 1", "User 2", "User 3"]

    return res.render("home/index", { title, status, users })
  },
}
