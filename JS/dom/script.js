/* const  contentElm = document.querySelector(".content")

// 1. Lấy nội dung trong thẻ HTML

console.log(contentElm.innerHTML)

// 2. Lấy nội dung text trong thẻ HTML và loại bỏ khoảng trắng

console.log(contentElm.innerText)

// 3. Lấy nội dung text trong thẻ HTML nhưng ko loại bỏ khoảng trắng

console.log(contentElm.textContent)

// 4. Lấy nội dung bảo gồm cả đối tượng đang tác động

console.log(contentElm.outerHTML)

// 5. Cập nhật nội dung thẻ HTML đang tác động

contentElm.innerHTML = "<h1>Javascript không khó<h1>"
contentElm.innerText = "" */

const couterElm = document.getElementById("counter")
const downElm = document.getElementById("down")
const upElm = document.getElementById("up")

function handleUp(event) {
    const span = upElm.querySelector("span")
    const count = Number(span.textContent)

    span.textContent = count + 1

    const number = Number(couterElm.textContent)
    couterElm.textContent = number + 1
}

function handleDown(event) {
    const span = downElm.querySelector("span")
    const count = Number(span.textContent)
    span.textContent = count + 1

    const  number = Number(couterElm.textContent)
    couterElm.textContent = number - 1
}

upElm.addEventListener("click", handleUp)
downElm.addEventListener("click", handleDown)
