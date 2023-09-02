var checkAllElm = document.getElementById("check-all");
var checkList = document.getElementById("check-list");

checkAllElm.addEventListener("change", function () {
  for (const checkboxElm of checkList.querySelectorAll("input[type='checkbox']")) {
    checkboxElm.checked = this.checked;
  }
});

for (const checkItem of checkList.children) {
  checkItem.children[0].addEventListener("change", function () {
    var checkedCount = checkList.querySelectorAll("input[type='checkbox']:checked").length;

    if (checkedCount === checkList.querySelectorAll("input[type='checkbox']").length) {
      checkAllElm.checked = true;
    } else {
      checkAllElm.checked = false;
    }
  });
}
