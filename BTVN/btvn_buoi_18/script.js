let index = 0;

const textElm = document.getElementById("text");
const textContent = textElm.innerText;
    
function render() {
    let strings = textContent.split(/\s/);

    if (!strings[index]) index = 0;

    const content = strings[index];
    const html = '<span class="hightlight">' + content + "</span>";

    strings[index] = html;
    textElm.innerHTML = strings.join(" ");
    index++;
}

setInterval(() => {
    render();
}, 1000);
