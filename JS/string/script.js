// console.log(String.prototype);

// var fullName = "Vũ Văn Thống";

// 1. length: lấy độ dài của chuỗi

// console.log(fullName.length);

// 2. charAt: lấy kí tự của chuỗi theo index

// console.log(fullName.charAt(1));

// 3. charCodeAt: lấy mã ASCII của kí tự theo index

// console.log(fullName.charAt(2) ,fullName.charCodeAt(2));

// 4. concat: nỗi chuỗi

// console.log("Xin chào", "", "F8");

// 5. indexOf: tìm vị trí xuất hiện đầu tiên của chuỗi con trong chuỗi cha, nếu không tìm thấy thì trả về -1

// 6. lastIndexOf: tìm vị trí xuất hiện cuối cùng của chuỗi con trong chuỗi cha, nếu không tìm thấy thì trả về -1

// 7. includes: tìm chuỗi con trong chuỗi cha và trả về true hoặc false

// 8. slice(start, end): cắt chuỗi từ chuỗi cha bắt đầu từ start đến end

// 9. replace(search, with): thay thế chuỗi
// var str = "Học lập trình tại F88";
// console.log(str.replace("F88", "F8"));

// 10. replaceAll: thay thế tất cả các chuỗi tìm thấy

// 11. split: tách chuỗi thành mảng

// console.log(fullName.split(" "));

// 12 trim(): xoá khoảng trắng ở đầu và cuối chuỗi

// var email = "hoangan.web@gmail.com";
// var userName = email.slice(0, email.indexOf("@"));
// console.log(userName)

// Bài 2. Kiểm tra xem 1 chuỗi có được viết hoa hết hay không;

// var str = "VŨ VĂN THỐNg";

// console.log(str.toLocaleUpperCase() === str);

var fullName = "vv văn thống f8";

let index = 0;

var replace = true;
while (index < fullName.length) {
    // console.log(fullName[index])
    if (replace) {
        fullName = fullName.replace(fullName[index], fullName[index].toLocaleUpperCase());
    }

    if (fullName[index] === " ") {
        replace = true;
    } else {
        replace = false;
    }

    index++;
}

console.log(fullName);
