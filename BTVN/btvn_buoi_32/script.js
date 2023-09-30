F8.component("counter-app", {
  data: () => ({
    count: 0,
    title: "Counter App",
  }),
  templace: `
    <h2>{{ title }}</h2>
    <h2>Đã đếm: {{ count }} lần</h2>
    <button v-on:click="count--">-</button>
    <button v-on:click="count++">+</button>
  `,
});

F8.component("header-component", {
  templace: `
    <h1>HEADER</h1>
  `,
});
