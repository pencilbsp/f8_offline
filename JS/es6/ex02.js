// const user = {
//   name: "Vũ Thống",
//   email: "pencil.bsp@gmail.com",
//   address: "Thanh Hoá"
// };

// const key = "address";

// const { name, email, [key]: address } = user;
// console.log(name, email, address);

const user = ["Vũ Thống", "pencil.bsp@gmail.com", 31, "Thanh Hoá"];
// const [username, email, age, address] = user;
const [username, email, ...rest] = user;

let a = "A";
let b = "B";

[a, b] = [b, a];

const users = [
  {
    id: 1,
    name: "Nguyen Van A",
  },
  {
    id: 2,
    name: "Nguyen Van B",
  },
  {
    id: 3,
    name: "Nguyen Van C",
  },
];

function getUserById(value) {
  return users.find(({ id }) => id === value);
}

const html = users.map(({ id, name }) => `<h2>${id} - ${name}</h2>`).join("");
