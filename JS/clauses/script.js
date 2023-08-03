var total = 15000000;

if (total < 5000000) {
    total = total - (total / 100 * 3);
} else if (total > 15000000) {
    total = total - (total / 100 * 10);
} else {
    total = total - (total / 100 * 5);
}

console.log(total);
