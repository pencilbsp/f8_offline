// Thêm phương thức vào object
/* 

Object.prototype.combine = function (...args) {
  var current = this;
  if (args.length > 0) {
    return args.map(function (key) {
      return current[key];
    });
  }
};

// Thêm thuộc tính vào object
Object.prototype.message = "Hello";

var user = {
  name: "Pencil",
  email: "pencil.bsp@gmail.com",
};

var result = user.combine("name", "email");
console.log(result);

console.log(user);
*/

// var user = {
//   name: "Pencil",
//   email: "pencil.bsp@gmail.com",
//   getName: function () {
//     return this.name;
//   },
// };

/*

function Person(name, email, age) {
  this.name = name;
  this.email = email;
  this.age = age;
  this.getName = function () {
    return this.name;
  };
}

Person.isPerson = function (person) {
  return person && person.constructor.name === "Person";
};

var user = new Person("Pencil", "pencil.bsp@gmail.com", 4);
console.log(Person.isPerson(user));
*/

// var a = {
//   name: "Pencil",
//   email: "pencil.bsp@gmail.com",
// };

// var b = {
//   teacher: "Hoàng An",
//   price: 500000,
// };

// var c = Object.assign(a, b);
// console.log(c);

// for (const key of Object.keys(b)) {
//   if (!a[key]) {
//     a[key] = b[key];
//   }
// }

// a = { ...a, ...b };
// console.log(a);

/*

// Bài tập 2:

var query = {
  name: "Vũ    Thống",
  keyword: "fullstack",
  category: 1,
};

var queryString = Object.keys(query)
  .map(function (key) {
    var value = `${query[key]}`.replace(/\s/g, "+");
    return key + "=" + value;
  })
  .join("&");

console.log(queryString);
console.log(new URLSearchParams(query).toString());
*/

// var a = Object.create(null)
// a.name = "Pencil"
// console.log(a)

// var a = {
//   name: "Hoàng An",
//   email: "hoangan.web@gmail.com",
// };

// // var b = Object.assign({}, a);
// var b = JSON.parse(JSON.stringify(a));
// b.name = "Hoàng An F8";

// Object.prototype.toString = function () {
//   return JSON.stringify(this);
// };

// console.log(a.toString());
// console.log(b);

// var a = undefined;
// console.log(a?.name);

var users = ["Item 1", "Item 2", "Item 3", "Item 4"];

Object.prototype.map2 = function (cb, index) {
  var result = [];

  var array = this;
  array.forEach((element, index) => {
    result.push(cb(element, index));
  });

  return result;
};

var result = users.map2(function (user) {
  return `<h3>${user}</h3>`;
});

console.log(result);
