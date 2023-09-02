// var total = 15000000;

// if (total < 5000000) {
//     total = total - (total / 100 * 3);
// } else if (total > 15000000) {
//     total = total - (total / 100 * 10);
// } else {
//     total = total - (total / 100 * 5);
// }

// console.log(total);

/*
2. Câu lệnh rẽ nhánh switch case
*/

var action = "delete";

// switch (action) {
//     case "add":
//     case "create":
//         console.log("Thêm");
//         break;

//     case "edit":
//     case "update":
//         console.log("Sửa");
//         break;

//     case "delete":
//         console.log("Xoá");
//         break;

//     default:
//         console.log("Danh sách");
// }

// if (action === "add" || action === "create" || action === "insert") {
//     console.log("Thêm");
// } else if (action === "edit" || action === "update") {
//     console.log("Sửa");
// } else if (action === "delete" || action === "remove" || action === "destroy") {
//     console.log("Xoá");
// } else {
//     console.log("Danh sách");
// }

/*
    Hiện thị số ngày của 1 tháng
    Quy ước:
    - 31 ngày: 1, 3, 5, 7, 8, 10, 12
    - 30 ngày: 4, 7, 9, 11
    - 29 ngày: 2
*/

var month = 1;
var daysInMonth;

if (month % 1 !== 0) {
    console.log("Tháng phải là số nghuyên");
} else if (month < 1 || month > 12) {
    console.log("Tháng không hợp lệ");
} else {
    switch (+month) {
        case 2:
            daysInMonth = 29;
            break;

        case 4:
        case 7:
        case 9:
        case 11:
            daysInMonth = 30;
            break;

        default:
            daysInMonth = 31;
    }
    console.log(`Tháng ${month} có ${daysInMonth} ngày`);
}
