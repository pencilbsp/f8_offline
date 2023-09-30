class Person {
  /**
   * constructor được chạy đầu tiên khi object được khởi tạo
   */
  constructor(name, email, age) {
    this.name = name;
    this.email = email;
    this.age = age;
  }

  getName() {
    return this.name;
  }

  getEmail() {
    return this.email;
  }

  getAge() {
    return this.age;
  }
}

class Girl extends Person {
  constructor(...args) {
    super(...args);
  }

  getInfo() {
    return `
      - Name: ${this.getName()}
      - Email: ${this.getEmail()}
      - Age: ${this.getAge()}
    `;
  }
}

const girl = new Girl("Tạ Hằng", "tahang2505@gmail.com", 24);
// console.log(girl);

customElements.define(
  "hello-world",
  class extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      this.innerText = "Hello world";
    }
  }
);

class User {
  constructor() {
    this.name = "Vũ Thống";
  }

  getName() {
    console.log(this.constructor.isUser());
    return this.name;
  }

  static age = 25;
  static isUser(data) {
    return typeof data === "object" && typeof data.name === "string";
  }
}
