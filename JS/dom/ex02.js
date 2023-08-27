var linkElm = document.querySelector(".link")
console.log(linkElm.href)

// Cập nhật giá trị thuộc tính
linkElm.href = "https://google.com.vn"
linkElm.title = "Trang chủ Google"

// Lấy data attribute
console.log(linkElm.getAttribute("data-count"))
console.log(linkElm.dataset)

// Set data attribute
linkElm.setAttribute("data-count", 10)

// Thêm class vào element
linkElm.classList.add("new-class")