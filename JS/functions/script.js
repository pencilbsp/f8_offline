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

// setTimeout(function (name) {
//   console.log(name);
// }, 2000, "Fullstack");
// var welcome = "Pencil F8";
// 
// var getMessages = function (msg) {
//   console.log(`gestMessages`);
// 
//   var display = function () {
//     console.log("Xin chào", msg);
//   }
// 
//   display();
// }
// 


// var sum = function (a) {
//   return function (b) { 
//     return a + b
//   }
// }
// 
// var add = sum(10);
// console.log(add(5));
// 

// setTimeout(function (name, email) {
//   console.log("Xin chào", name, email);
// }, 2000, "Pencil", "pencil.bsp@gmail.com");
// 
// var count = 0;
// var id = setInterval(function (name, email) {
//   console.log("Xin chào", name, email);
//   count++;
// 
//   if (count > 10) {
//     clearInterval(id);
//   }
// }, 1000, "Pencil", "pencil.bsp@gmail.com");
// 
//


var showNumber = function (n) {
  console.log(n);

  if (n > 1) {
    showNumber(n - 1);
  }
};

// showNumber(10);


// var sum = function (n, total = 0) {
//   total = total + n;
//   if (n === 1) {
//    // total = total + n;
//     return total
//   } else {
//     return sum(n - 1, total)
//   }
// }
// 
// var total = sum(3);
// console.log(total);


// var fibonaci = function (n) {
//   if (n === 1 || n === 2) {
//     return 1;
//   }
// 
//   return fibonaci(n - 1) + fibonaci(n - 2);
// }
// 
// console.log(fibonaci(6));
//



