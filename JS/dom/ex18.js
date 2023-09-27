// var host = document.querySelector(".content");
// var root = host.attachShadow({
//   mode: "open",
// });

// root.innerHTML = `<h1>F8 - Fullstack</h1>`
// var style = document.createElement("style")
// style.textContent = `
// h1 {
//   color: red;
// }
// `

// root.prepend(style)

component.create("todo-item", function () {
  var doName = this.innerText;

  var templaceHTML = `
    <div class="todo">
      <input type="checkbox"></input>
      <span>${doName}</span>
    </div>
  `;

  var templace = document.createElement("template");
  templace.innerHTML = templaceHTML;

  var templaceNode = templace.content.cloneNode(true);
  // console.log(templaceNode.children[0].children[0])

  var shadow = this.attachShadow({
    mode: "open",
  });

  shadow.append(templaceNode);

  var style = document.createElement("style");
  style.textContent = `
  .todo {
    border: 1px solid red;
    padding: 10px;
    margin: 5px 0;
  }
  `;

  shadow.prepend(style);
});
