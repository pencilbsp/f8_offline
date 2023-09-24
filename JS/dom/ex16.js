HTMLElement.prototype.css = function (style) {
  Object.assign(this.style, style);
};

var content = document.querySelector(".content");
content.css({ color: "red", fontSize: "2rem" });
console.log(content);
