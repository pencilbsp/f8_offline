var a = "10";

// console.log(a, typeof a);

// Kiểm tra 1 biến có phải là số hay không
// if (typeof a === "number") {
//   console.log("Đây là số");

//   if (Number.isInteger(a)) {
//     console.log("Đây là số nguyên");
//   } else {
//     console.log("Đây không phải là số nguyên");
//   }
// } else {
//   console.log("Không phải là số");
// }

// Ép kiểu
var a = "10a123";
// Ép kiểu số nguyên
// a = Number.parseInt(a);

// Ép kiểu số thực
// a = Number.parseFloat(a);

// Ép kiểu số
// a = Number(a); // Hoặc a = +a

/*
Bài tập: Tính tổng các số chẵn
*/

// var numbers = [5, 2, 1, 9, 8, 4];
// var total = numbers.reduce((t, c) => {
//   c = Number(c);
//   if (!isNaN(c) && c % 2 === 0) {
//     t = t + c;
//   }

//   return t;
// }, 0);

var a = 1900000;
// a = a.toFixed(0)

var formater = new Intl.NumberFormat("vi", { style: "currency", currency: "VNDD" });

console.log(formater.format(a));
