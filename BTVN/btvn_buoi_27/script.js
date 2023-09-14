var products = [
  {
    product_id: 1,
    product_name: "Sản phẩm 1",
    product_price: 1000,
  },
  {
    product_id: 2,
    product_name: "Sản phẩm 2",
    product_price: 2000,
  },
  {
    product_id: 3,
    product_name: "Sản phẩm 3",
    product_price: 3000,
  },
  {
    product_id: 4,
    product_name: "Sản phẩm 4",
    product_price: 4000,
  },
];

var cartElm = document.getElementById("cart");
var updateCartElm = document.getElementById("update_cart");
var deleteCartElm = document.getElementById("delete_cart");
var cartEmty = document.getElementById("cart_emty");
var cartTable = document.getElementById("cart_table");
var productTable = document.getElementById("product_table");

function isValidQuantity(num) {
  return typeof num === "number" && num !== NaN && num > -1;
}

var Cart = function () {
  this.cart = [];

  this.total = function () {
    return this.cart.reduce(function (t, c) {
      return (t += c.quantity);
    }, 0);
  };

  this.totalPrice = function () {
    return this.cart.reduce(function (t, c) {
      return (t += c.quantity * c.product_price);
    }, 0);
  };

  this.update = function (id, quantity) {
    if (typeof id === "number" && isValidQuantity(quantity)) {
      var index = this.cart.findIndex((e) => e.product_id === id);
      if (index > -1) {
        quantity === 0 ? this.remove(id) : (this.cart[index].quantity = quantity);
      }
    }

    if (this.cart.length === 0) {
      cartEmty.style.display = "";
      cartElm.style.display = "none";
    } else {
      cartElm.style.display = "";
      cartEmty.style.display = "none";
      var root = cartTable.children[1];
      var foot = cartTable.children[2];

      root.innerHTML = "";
      root.append(...this.cart.map((p, index) => createCartItemElm(p, index + 1)));

      foot.children[0].children[1].textContent = this.total();
      foot.children[0].children[2].textContent = this.totalPrice();
    }

    window.localStorage.setItem("cart_list", JSON.stringify(this.cart));
  };

  this.add = function ({ product_id, quantity }) {
    var index = this.cart.findIndex((e) => e.product_id === product_id);
    if (index < 0) {
      var newItem = arguments[0];
      newItem.index = this.cart.length + 1;
      this.cart.push(newItem);
    } else {
      this.cart[index].quantity += quantity;
    }

    this.update();
  };

  this.remove = function (id) {
    var result = confirm("Want to delete?");
    if (result) {
      if (id) {
        this.cart = this.cart.filter((e) => e.product_id !== id);
      } else {
        this.cart = [];
      }

      this.update();
    }
  };

  this.init = function () {
    var cache = window.localStorage.getItem("cart_list");
    if (typeof cache === "string") {
      this.cart = JSON.parse(cache);
    }

    this.update();
  };
};

var cart = new Cart();

function createProductElm() {
  var { product_id, product_name, product_price } = arguments[0];

  var trElm = document.createElement("tr");

  var sttElm = document.createElement("td");
  sttElm.textContent = product_id.toString();

  var nameElm = document.createElement("td");
  nameElm.textContent = product_name;

  var priceElm = document.createElement("td");
  priceElm.textContent = product_price.toString();

  var actionElm = document.createElement("td");
  var inputElm = document.createElement("input");
  inputElm.setAttribute("type", "number");
  inputElm.setAttribute("value", "1");

  var btnElm = document.createElement("button");
  btnElm.textContent = "Thêm vào giỏ hàng";
  btnElm.addEventListener("click", function () {
    var quantity = Number(inputElm.value);
    cart.add({ product_id, product_name, product_price, quantity });
  });

  actionElm.append(inputElm, btnElm);
  actionElm.classList.add("action");

  trElm.append(sttElm, nameElm, priceElm, actionElm);
  return trElm;
}

function createCartItemElm() {
  var index = arguments[1];
  var { product_id, product_name, product_price, quantity } = arguments[0];

  var trElm = document.createElement("tr");

  var sttElm = document.createElement("td");
  sttElm.textContent = index.toString();

  var nameElm = document.createElement("td");
  nameElm.textContent = product_name;

  var priceElm = document.createElement("td");
  priceElm.textContent = product_price.toString();

  var quantityElm = document.createElement("input");
  quantityElm.setAttribute("type", "number");
  quantityElm.setAttribute("value", quantity.toString());
  quantityElm.addEventListener("blur", function () {
    cart.update(product_id, Number(this.value));
  });
  quantityElm.addEventListener("keyup", function (event) {
    if ([13, 27].includes(event.keyCode)) {
      cart.update(product_id, Number(this.value));
      this.blur();
    }
  });

  var totalPriceElm = document.createElement("td");
  totalPriceElm.textContent = `${product_price * quantity}`;

  var actionElm = document.createElement("td");
  var btnElm = document.createElement("button");
  btnElm.textContent = "Xoá";
  btnElm.addEventListener("click", function () {
    cart.remove(product_id);
  });

  actionElm.append(btnElm);

  trElm.append(sttElm, nameElm, priceElm, quantityElm, totalPriceElm, actionElm);
  return trElm;
}

deleteCartElm.addEventListener("click", function () {
  cart.remove();
});

updateCartElm.addEventListener("click", function () {
  cart.update();
});

(function () {
  var root = productTable.children[1];
  root.append(...products.map((p) => createProductElm(p)));
  cart.init();
})();
