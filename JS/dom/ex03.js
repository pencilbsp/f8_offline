// DOM CSS: Can thiệp CSS vào các element thông qua thuộc tinh style

var btnElm = document.getElementById("btn");
var contentElm = document.getElementById("content");

btnElm.addEventListener("click", function () {
  if (btnElm.textContent === "Ẩn") {
    btnElm.textContent = "Hiện";
    contentElm.style.display = "none";
  } else {
    btnElm.textContent = "Ẩn";
    contentElm.style.display = "block";
  }
});

// content.style = "color: red; font-weight: bold;";

/**
 * @type {CSSStyleDeclaration}
 */
// var css = {
//   background:
//     'url(https://images.unsplash.com/photo-1613963761543-cc92783708fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2710&q=80)',
//   transition: "all 400ms ease",
//   transform: "translateX(20px)",
// };

// Object.assign(content.style, css);
