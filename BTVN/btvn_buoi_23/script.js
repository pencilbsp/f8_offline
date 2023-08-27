document.getElementById("auth-model-toggle").addEventListener("click", function () {
  document.getElementById("form-model").classList.toggle("active");
});

function handleShowPassword({ currentTarget }) {
  const isShow = currentTarget.dataset.show === "true";

  if (!isShow) {
    currentTarget.children[0].style.display = "none";
    currentTarget.children[1].style.display = "initial";
  } else {
    currentTarget.children[1].style.display = "none";
    currentTarget.children[0].style.display = "initial";
  }

  currentTarget.dataset.show = !isShow;
  currentTarget.previousElementSibling.type = isShow ? "password" : "text";
}

function handleTabActive(target) {
  for (const elm of target.parentElement.children) {
    elm.classList.remove("active");
  }

  target.classList.toggle("active");

  const dataActive = target.dataset.active;
  const targetTab = document.getElementById(dataActive + "-tab");

  for (const elm of targetTab.parentElement.children) {
    elm.classList.remove("active");
  }

  targetTab.classList.toggle("active");
}

const formSchema = {
  login: {
    email: {
      required: [true, "Vui lòng nhập email"],
      type: ["email", "Email không hợp lệ"],
    },
    password: {
      required: [true, "Vui lòng nhập mật khẩu"],
      type: ["string"],
      min: [6, "Mật khẩu quá ngắn"],
      max: [48, "Mật khẩu quá dài"],
    },
  },
  register: {
    fullName: {
      required: [true, "Vui lòng nhập họ và tên"],
      type: ["string"],
    },
    email: {
      required: true,
      type: ["email", "Email không hợp lệ"],
    },
    password: {
      required: [true, "Vui lòng nhập mật khẩu"],
      type: ["string"],
      min: [6, "Mật khẩu quá ngắn"],
      max: [48, "Mật khẩu quá dài"],
    },
  },
};

function isEmail(str) {
  // regex from: https://emailregex.com/index.html
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    str
  );
}

/**
 * @param {FormData} data
 * @param {Object} schema
 */
function validate(data, schema) {
  let errors = Object.keys(schema).reduce((e, k) => {
    e[k] = [];
    return e;
  }, {});

  for (const key of Object.keys(schema)) {
    const value = data.get(key);
    const parten = schema[key];

    if (parten.required?.[0] && !value) {
      errors[key].push(parten.required[1]);
    }

    if (parten.type?.[0] === "email" && !isEmail(value)) {
      errors[key].push(parten.type[1]);
    }

    if (parten.type?.[0] === "string" && typeof value !== "string") {
      errors[key].push(parten.type[1]);
    } else {
      if (parten.min?.[0] > value?.length) {
        errors[key].push(parten.min[1]);
      }
      if (parten.max?.[0] < value?.length) {
        errors[key].push(parten.max[1]);
      }
    }
  }

  return errors;
}

/**
 * @param {HTMLInputElement} input
 * @param {Object} schema
 */
function validateField(input) {
  const formElm = input.form;
  const formType = formElm.outerHTML.includes("login") ? "login" : "register";
  formValidate(formElm, formSchema[formType], input);
}

/**
 * @param {HTMLFormElement} formElm
 * @param {Object} schema
 * @param {HTMLInputElement|undefined} inputElm
 */
function formValidate(formElm, schema, inputElm) {
  let isValid = true;
  const formData = new FormData(formElm);

  const errors = validate(formData, schema);
  for (const key of Object.keys(errors)) {
    const fieldElm = formElm.querySelector(`div[data-validate=${key}]`);

    if (inputElm && !fieldElm.contains(inputElm)) continue;

    const messageElm = fieldElm.querySelector(".input-validate");

    if (errors[key].length > 0) {
      isValid = false;
      messageElm.textContent = errors[key][0];
      fieldElm.classList.add("has-error");
    } else {
      messageElm.textContent = "";
      fieldElm.classList.remove("has-error");
    }
  }

  return { isValid, data: formData };
}

/**
 * @param {Event} event
 */
function handleSubmit(event, action) {
  event.preventDefault();
  const { isValid, data } = formValidate(event.currentTarget, formSchema[action]);
  if (isValid) {
    console.log(Object.fromEntries(data.entries()));
  }
}
