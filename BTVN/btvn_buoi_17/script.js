// BT1
function calculateTaxiFee(distance) {
    if (distance <= 0) return 0;
    if (distance <= 1) return distance * 15000;
    if (distance <= 5) return 15000 + (distance - 1) * 13500;

    const totalFee = 15000 + 4 * 13500 + (distance - 5) * 11000;
    return distance <= 120 ? totalFee : totalFee - (totalFee / 100) * 10;
}

// BT2
function calculateElectricityFee(amount, totalFee = 0, rate = 1) {
    // Dùng string thay cho array
    const str = "167817342014253628342927";
    const str2 = "001050051100101200201300301400401";

    // Lấy gía mỗi số điện bậc thanh giá điện
    const pricePerKwh = +str.slice((rate - 1) * 4, rate * 4);

    // Tính toán số kWh sử dụng trong từng bậc thang điện
    const x = str2.slice((rate - 1) * 6, rate * 6);
    const start = x.slice(0, 3) ? +x.slice(0, 3) : 0;
    const end = x.slice(3) ? +x.slice(3) + 1 : Infinity;
    const range = end - start;
    const length = amount > range ? range : amount;

    // console.log({ amount, range, length, price, ratePrice: length * price });

    // Tính tổng giá điện
    totalFee = totalFee + length * pricePerKwh;

    // Tính lượng điện còn lại cho vòng lặp tiếp theo
    amount = amount - length;

    // Tăng bậc thanh giá điện thêm 1 bậc
    rate++;

    if (rate <= 6) return calculateElectricityFee(amount, totalFee, rate);
    return totalFee;
}

// BT3
function sum(n) {
    let i = 1;
    let tmp = 0;
    while (i <= n) {
        tmp = tmp + i * (i + 1);
        i++;
    }

    return tmp;
}

// BT4
function idPrimeNumber(num) {
    // Corner case
    if (num <= 1) return false;

    // Check from 2 to n-1
    for (let i = 2; i < num; i++) if (num % i == 0) return false;

    return true;
}

// BT5
function paintTriangleNumber(n, start = 1) {
    let i = 1;
    // while () {

    // }
}

// BT8
function bt8(n, tmp = 1, i = 2) {
    if (i > n) return tmp;

    tmp = tmp + 1 / i;
    i++;
    return bt8(n, tmp, i);
}
