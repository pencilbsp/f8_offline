function getMessage(msg, type = "log") {
  console[type](msg);
}

// getMessage("Học lập trình để đi làm");


function sum(a, b) {
  var total = a + b;
  // console.log(total);
  return total;
}

// var result = sum(10, 20);

// console.log(result + 50);


function division(a, b) {
  if (b !== 0) {
    var result = a / b;
    return result;
  }

  return "Không tính được";
}

// console.log(division(1, 0));

var msg = "Pencil F8";

function getMessage() {
  return msg;
}

function setMessage(value) {
  msg = value;
}

// console.log(getMessage());


function max(result, ...args) {
  console.log(args)

}

// max("Max =", 5, 10, 15, 20, 25);


// Expression function -> anonymous function

var getMessage = function() {
  console.log("Xin chào F8");
}

// getMessage();

// console.log(typeof getMessage);

// IIFE

// ;(function (value) {
//   console.log("Khoá học " + value);
// })("Fullstack");


// Callback

function getA(fn) {
  if (typeof fn === "function") {
    fn();
  }
}

function getB() {
  console.log("getB");
}


getA(function () {
  console.log("Xin chào F8");
});

// Delay

setTimeout(function (name) {
  console.log(name);
}, 2000, "Fullstack");
