var container = document.querySelector(".list");
var list = document.querySelectorAll(".list-item");

function sort() {
  var index1 = 1,
    index2 = 1;
  for (var item of document.querySelectorAll(".list-item")) {
    var title;
    if (item.classList.contains("active")) {
      title = "Module " + index1 + ":";
      index1++;
    } else {
      title = "Bài " + index2 + ":";
      index2++;
    }

    var content = item.children[0]?.textContent || item.textContent;
    item.innerHTML = `${title} <span>${content}</span>`;
  }
}

function getAffterElm(container, clientY) {
  var elms = [...container.querySelectorAll(".list-item:not(.dragging)")];
  return elms.reduce(
    function (closet, child) {
      var bounding = child.getBoundingClientRect();
      var offset = clientY - bounding.top - bounding.height / 2;
      if (offset < 0 && offset > closet.offset) {
        return { offset: offset, elm: child };
      } else {
        return closet;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).elm;
}

sort();

list.forEach(function (item) {
  item.addEventListener("dragstart", function () {
    item.classList.add("dragging");
  });

  item.addEventListener("dragend", function () {
    item.classList.remove("dragging");
    sort();
  });
});

container.addEventListener("dragover", function (event) {
  event.preventDefault();
  var affterElm = getAffterElm(container, event.clientY);
  var draggingElm = container.querySelector(".dragging");

  if (!affterElm) {
    container.appendChild(draggingElm);
  } else {
    container.insertBefore(draggingElm, affterElm);
  }
});
