// Bài tập 1:
function minMax(numberArray) {
  if (!Array.isArray(numberArray)) return console.log("Dữ liệu phải là một mảng");

  var index = 0;
  var min = (max = [numberArray[index], index]);

  while (numberArray[index]) {
    var current = numberArray[index];

    if (current < min[0]) {
      min = [current, index];
    }

    if (current > max[0]) {
      max = [current, index];
    }

    index++;
  }

  console.log(`Số lớn nhất: ${max[0]}, index: ${max[1]}`);
  console.log(`Số nhỏ nhất: ${min[0]}, index: ${min[1]}`);
}

// minMax([24, 16, 27, 5, 18, 9, 32, 15, 11]);

// Bài tập 2:
function isPrime(n) {
  if (isNaN(n) || !isFinite(n) || n % 1 || n < 2) return false;
  var m = Math.sqrt(n);
  for (var i = 2; i <= m; i++) if (n % i == 0) return false;
  return true;
}

function averageOfPrimes(numberArray) {
  if (!Array.isArray(numberArray)) return console.log("Dữ liệu phải là một mảng");

  var primeNumbers = numberArray.filter(isPrime);
  if (primeNumbers.length === 0) return console.log("Không có số nguyên tố");

  console.log("Các số nguyên tố trong mảng:", primeNumbers);
  var average = primeNumbers.reduce((t, c) => (t += c), 0) / primeNumbers.length;
  console.log("Trung bình các số nguyên tố trong mảng:", average);
}

// averageOfPrimes([1, 2, 24, 16, 27, 5, 18, 9, 32, 15, 11]);

// Bài tập 3:
function duplicateFilter(numberArray) {
  if (!Array.isArray(numberArray)) return console.log("Dữ liệu phải là một mảng");
  return numberArray.reduce((a, c) => (!a.includes(c) ? a.push(c) && a : a), []);
}

// console.log(duplicateFilter([13, 24, 65, 13, 7, 9, 9, 38, 19, 25, 5, 19, 25]));

// Bài tập 4:
var numbers = [5, 1, 9, 8, 10];
var element = 4;
function sort(numberArray, number) {
  numberArray.push(number);
  return numberArray.sort((a, b) => a - b);
}

console.log(sort(numbers, element));
