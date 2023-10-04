// export default
// export name

function getUser() {
  return [
    {
      id: 1,
      name: "Hoàng An",
    },
    {
      id: 2,
      name: "Nguyễn Dương",
    },
  ];
}

function getProducts() {
  return "Products";
}

const posts = ["Post 1", "Post 2"];

export default getUser;
export { getProducts, posts };
