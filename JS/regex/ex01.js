/**
 * Regular Expression, Regex: Biểu thức chính quy
 *
 * - Các quy tắc dùng để xử lý chuỗi nâng cao
 * - Tạo bởi các kí hiệu đại diện cho các kí tự
 * - Tác dụng:
 *  + So khớp: kiểm tra chuỗi thoả mãn điều hiện
 *  + Cắt chuỗi
 *  + Thay thế
 */

// const pattern = /^(https|http):\/\/(www\.)*[a-z0-9-_.]+/;
// const string = "hoangan-123";
// const check = pattern.test(string);
// console.log(check);


const VALID_PHONE_NUMBER = /(?:0|+84)\d{9}/