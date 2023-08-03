/*
Toán từ - Biểu thức

Biểu thức = Toán hạng + Toán từ

1. Toán tử số học

+, - , * , /, % (chia lấy dư), ** (luỹ thừa)

++, -- -> Phép tăng, phép giảm

*/

// var a = 10;
// var b = "20.5"; // Chuỗi số

// var c = a + +b;

// console.log(c);

// var a = 10;
// var b = 3;
// var c = a ** b;
// console.log(c);

// var count = 1;
// count++; // count = count + 1
// ++count; // count = count + 1

// var total = count++ + ++count;
// console.log(total);

/*
2. Toán tử logic

>, <, >=, <=, ==, ===, !=, !==

-> Trả về kiểu boolean (true | false)
*/

/*
3. Toán tử gán

*/

// var a = 10;

// a += 5; // a = a + 5;
// a -= 5; // a = a - 5;
// a *= 5; // a = a * 5;
// a /= 5; // a = a / 5;
// a %= 5; // a = a % 5;

// console.log(a);

// var str = "F8";
// str += " F8";
// str += " F8";
// str += " F8";

// console.log(str);

/*
4. Tóan tử lý luận
&& -> Và
|| -> Hoặc
! -> Phủ định
*/

/*
5. Tóan tử 3 ngôi

bieuthuc ? giatridung : giatrisai
*/

// var a = 9;
// var b = a >= 10 ? "F8" : "Pencil";
// document.write(b);

/*
6. Toán tử nullish (??)
*/

// var a = 10;
// // var b = a ?? "F8"; // Check !== null && !== undefined

// var b = a ? "F8" : "Pencil";
// console.log(b);

/*
Tự động chuyển về boolean trong trường hợp phải so sánh

Nếu chuyển vể false -> falsy
0, "", false, undifinded, null, NaN

Các trường hợp còn lại chuyển về true -> truthy
*/

/*
7. Toán từ &&
*/

var a = "Pencil";
var b = a && "F8";

console.log(b);
