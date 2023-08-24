// Bài tập 1:
var errors = {
  name: {
    required: "Vui lòng nhập họ tên",
    min: "Họ tên phải từ 5 ký tự",
  },
  email: {
    email: "Định dạng email không hợp lệ",
    unique: "Email đã có người sử dụng",
    required: "Vui lòng nhập địa chỉ email",
  },
  password: {
    required: "Vui lòng nhập mật khẩu",
    same: "Mật khẩu phải khớp với mật khẩu nhập lại",
  },
  getError: function (field) {
    var e = this[field] || {};
    return Object.values(e)[0];
  },
};

// console.log(errors.getError("email"));

/* =============================================================== */

// Bài tập 2:
const customers = [
  { name: "Nguyễn Văn A", age: 11, address: "Ha Noi" },
  { name: "Nguyễn Văn B", age: 2, address: "Hai Phong" },
  { name: "Nguyễn Văn C", age: 12, address: "TP.HCM" },
];

function Customer(name, age, address) {
  this.name = name;
  this.age = age;
  this.address = address;
  this.sortName = function () {
    var names = this.name?.split(" ") || [];
    if (names.length < 3) return this.name;
    return [names[0], names[names.length - 1]].join(" ");
  };
}

function createCustomers(customers) {
  if (Array.isArray(customers)) {
    var customerList = customers.map((a) => {
      var c = new Customer(...Object.values(a));
      return { ...c, sortName: c.sortName() };
    });
    customerList = customerList.sort((a, b) => a.age - b.age);
    return customerList;
  }
}

// console.log(createCustomers(customers));

/* =============================================================== */

// Bài tập 3:
function User(name, password, email) {
  this.name = name;
  this.password = password;
  this.email = email;
  this.rule = "user";
}

/**
 * @type {User[]}
 */
var data = [];

function register(name, password, email) {
  if (arguments.length === 0) {
    throw new Error("Đăng ký yêu cầu tên, email và mật khẩu");
  }

  if (!name) {
    throw new Error("Vui lòng nhập họ tên");
  }

  if (!password) {
    throw new Error("Vui lòng nhập mật khẩu");
  }

  if (!email) {
    throw new Error("Vui lòng nhập địa chỉ email");
  }

  var exitsUser = data.find((u) => u.email === email);

  if (exitsUser) {
    throw new Error("Email đã được đăng ký");
  }

  var newUser = new User(name, password, email);
  data.push(newUser);
  return data;
}

function login(email, password) {
  if (arguments.length === 0) {
    throw new Error("Đăng nhập yêu cầu email và mật khẩu");
  }

  if (!password) {
    throw new Error("Vui lòng nhập mật khẩu");
  }

  if (!email) {
    throw new Error("Vui lòng nhập địa chỉ email");
  }

  var user = data.find((u) => u.email === email);

  if (!user) {
    throw new Error("Email chưa được đăng ký");
  }

  if (user.password !== password) {
    throw new Error("Mật khẩu không chính xác");
  }

  return user;
}

register("Nguyen Van A", "123456", "nguyenvana@email.com");
var dataRegister = register("Nguyen Van B", "1234567", "nguyenvanb@email.com");

const dataLogin = login("nguyenvana@email.com", "123456");

console.log("dataRegister:", dataRegister);
console.log("dataLogin:", dataLogin);
