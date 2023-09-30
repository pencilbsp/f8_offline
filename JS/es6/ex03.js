const oldOjb = {
  name: "Vu Thong",
  email: "pencil.bsp@gmail.com",
};

const newOjb = {
  course: "Fullstack",
  ...oldOjb,
};

function getTotal(a, b) {
  console.log(a, b);
}

const values = [10, 20];

getTotal(...values);

