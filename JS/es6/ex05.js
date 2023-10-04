class User {
  constructor() {
    this.data = ["Item 1", "Item 2"];
  }

  // Get first element
  get first() {
    return this.data[0];
  }

  get latest() {
    this.data[this.data.length - 1];
  }

  set latest(value) {
    this.data.push(value);
  }
}

const user = new User();

// console.log(user.first);
user.latest = "Item 3";
console.log(user.data)
