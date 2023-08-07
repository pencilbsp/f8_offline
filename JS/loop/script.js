/*
    2 loại vòng lặp

1. Vòng lặp với số lần lặp xác định trước
for (bien_chay; dieu_kien_dung; buoc_nhay) {

}

2. Vòng lắp với số lần lặp không xác định
*/

// for (let i = 0; i < 10; i++) {
//     console.log(`Lần lặp thứ ${i + 1}`);
// }

//var N = 10;
//var total = 0;

//for (let i = 1; i <= N; i++) {
//    total = total + i;
//}

// console.log(total);

// Tính giá trị của biểu thức

// var total = 0;
// var n = 5;
// var subTotal = 1;
// for (var i = 1; i <= 5; i++) {
//   var k = 1;
//   for (var j = 1; j <= i; j++) {
//     k = k * j;
//   }
//
//   total = total + k;
// }

// for (var i = 1; i <= n; i++) {
//     subTotal *= i;
//     total += subTotal;
// }
// 
// // console.log(total);
// 
// var str = "";
// 
// for (var i = 1; i <= 5; i++) {
//     for (var j = 1; j <= i; j++) {
//         str += "*";
//     }
//     str += "\n"
// }
// 
// console.log(str);


/*
  2. Vòng lặp while
 * */
// var s = 0;
// var i = 0;
// while (i < 10) {
//   // console.log(`Lần lặp thứ ${i}`);
//   s += i;
//   i++;
// }

// var i = 10;
// 
// do {
//   console.log(i);
// } while (i > 10);
// 
// console.log(s)

for (var i = 1; i <= 10; i++) {
  console.log(`Lần lặp thứ ${i}`);
  if (i === 5) {
    break;
  }
}

var begin = 3;
var end = 10;

// Tìm số chẵn nhỏ nhất trong khoảng từ begin đến end

var even;
for (var i = begin; i <= end; i++) {
  if (i % 2 === 0) {
    even = i;
    break;
  }
}

console.log(`Số chẵn nhỏ nhất: ${even}`);


for (var i = 0; i <= 10; i++) {
  if (i === 5) continue;

  console.log(`Lần lặp thứ ${i}`);
}
