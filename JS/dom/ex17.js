// function HelloWorld() {
//   return Reflect.construct(HTMLElement, [], this.contructor);
// }

// HelloWorld.prototype = Object.create(HTMLElement.prototype);
// HelloWorld.prototype.contructor = HelloWorld;

// HelloWorld.prototype.connectedCallback = function () {
//   this.innerText = "Xin chào F8";
//   var name = this.getAttribute("name");
//   console.log(name);
// };

// HelloWorld.prototype.diconnectedCallback = function () {
//   console.log("Thẻ bị xoá khỏi DOM");
// };

// customElements.define("hello-world", HelloWorld);

component.create("hello-world", function () {
  this.innerText = "Xin chào F8";
});
