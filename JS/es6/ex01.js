// Arrow function

/**
 * - Arrow function không được sử dụng để thay thế function truyền thống
 * - Arrow function không binding được this
 * - Arrow function không binding được arguments
 * - Arrow function thường không đượ sử dụng để tạo method cho object
 * - Arrow function không có hoisting
 * - Arrow function không được sử dụng để xây dựng Contructor
 */

var btn = document.querySelector(".btn");
btn.addEventListener("click", () => {
  console.log(this);
});

const user = {
  name: "Thong",
  email: "pencil.bsp@gmail.com",
  getName: function () {
    return {
      getInfo: () => {
        return this.name;
      },
    };
  },
};

// const max = () => {
//   console.log(arguments);
// };

// max(12, 24, 1);