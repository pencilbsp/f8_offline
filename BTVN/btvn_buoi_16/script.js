// Bài tập 1:
console.log("---- Bài tập 1: ----");

var a = 5,
    b = 7;

console.log({ a, b });

// a = (b * (b += a - b)) / a;
a = a + b - b

console.log({ a, b });

// Bài tập 2:
console.log("\n---- Bài tập 2: ----");

var S = 10 + 20 + 5 ** 10 / 2;

console.log(`S = 10 + 20 + 5 ** 10 / 2`);

// Bài tập 3:
console.log("\n---- Bài tập 3: ----");

var a = 3,
    b = 7,
    c = 5;

console.log({ a, b, c });

var max = a;

if (b > max) {
    max = b;
}

if (c > max) {
    max = c;
}

console.log("Số lớn nhất là:", max);

// Bài tập 4:
console.log("\n---- Bài tập 4: ----");

var a = -4,
    b = 9;

console.log({ a, b });

if ((a >= 0 && b >= 0) || (a < 0 && b < 0)) {
    console.log("a và b cùng dấu");
} else {
    console.log("a và b khác dấu");
}

// Bài tập 5:
console.log("\n---- Bài tập 5: ----");

var a = 5,
    b = 2,
    c = 3;

console.log({ a, b, c });

if (a > b) {
    a = (b * (b += a - b)) / a;
}

if (a > c) {
    a = (c * (c += a - c)) / a;
}

if (b > c) {
    b = (c * (c += b - c)) / b;
}

console.log({ a, b, c });
