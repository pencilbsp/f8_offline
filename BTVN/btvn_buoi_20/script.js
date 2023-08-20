// Bài tập 1:
var arrA = [1, 4, 3, 2];
var arrB = [5, 2, 6, 7, 1];
function exercise1(arrA, arrB) {
  return arrA.concat(arrB).reduce(function (arr, num) {
    if (arrA.includes(num) && arrB.includes(num) && !arr.includes(num)) {
      arr.push(num);
    }

    return arr;
  }, []);
}

// console.log(exercise1(arrA, arrB));

// Bài tập 2:
var arrEx02 = [0, 1, [2, 3], [4, 5, [6, 7]], [8, [9, 10, [11, 12]]]];
function exercise2(arr) {
  return arr.reduce(function (flat, num) {
    return flat.concat(Array.isArray(num) ? exercise2(num) : num);
  }, []);
}

// console.log(exercise2(arrEx02));

// Bài tập 3:
var arrEx03 = [
  ["a", 1, true],
  ["b", 2, false],
];
function exercise3(arr) {
  var types = [];
  var arrFlated = exercise2(arr);

  return arrFlated.reduce(function (array, value) {
    var typeOfValue = typeof value;
    var typeIndex = types.findIndex((t) => t === typeOfValue);

    if (typeIndex < 0) {
      array.push([value]);
      types.push(typeOfValue);
    } else {
      array[typeIndex].push(value);
    }

    return array;
  }, []);
}

// console.log(exercise3(arrEx03));

// Bài tập 4:
var data = [
  {
    id: 1,
    title: "Tiêu đề bài viết 1",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat dolores ea quas possimus non! Corrupti quae nesciunt ipsam suscipit eum quam repellendus dolores harum sit, laudantium delectus quisquam amet atque.",
    coverImage:
      "https://images.unsplash.com/photo-1676816823266-a8bb9a998de7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=80",
  },
  {
    id: 2,
    title: "Tiêu đề bài viết 2",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat dolores ea quas possimus non! Corrupti quae nesciunt ipsam suscipit eum quam repellendus dolores harum sit, laudantium delectus quisquam amet atque.",
    coverImage:
      "https://images.unsplash.com/photo-1692198669686-0a3959951e11?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2108&q=80",
    coverRight: true,
  },
  {
    id: 3,
    title: "Tiêu đề bài viết 3",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat dolores ea quas possimus non! Corrupti quae nesciunt ipsam suscipit eum quam repellendus dolores harum sit, laudantium delectus quisquam amet atque.",
    coverImage:
      "https://images.unsplash.com/photo-1691962898718-4dfecbf3c0f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
];

function render(data) {
  var elms = data.map(function (item) {
    var titleElm = document.createElement("h2");
    titleElm.textContent = item.title;

    var contentElm = document.createElement("p");
    contentElm.textContent = item.content;

    var coverElm = document.createElement("img");
    coverElm.setAttribute("src", item.coverImage);
    coverElm.setAttribute("alt", item.title);

    var contentWrapElm = document.createElement("div");
    contentWrapElm.append(titleElm, contentElm);

    var wrapElm = document.createElement("div");
    wrapElm.classList.add("post");
    if (item.coverRight) wrapElm.classList.add("reverse");

    wrapElm.append(coverElm, contentWrapElm);

    return wrapElm;
  });

  var containerElm = document.createElement("div");
  containerElm.classList.add("container");
  containerElm.append(...elms);

  document.getElementById("root").appendChild(containerElm);
}

render(data);
