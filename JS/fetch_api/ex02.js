/**
 * Tách phần fetch api thành object client
 * => Dễ bảo trì
 * => Giải quyết các bài toán phức tạp liên quan đến API trong dự án
 */

import { client } from "./client.js";

const getUsers = async () => {
  const { data } = await client.get("/users");
  console.log(data);
};

const getUser = async (id) => {
  const { data } = await client.get(`/users/${id}`);
  console.log(data);
};

const getPosts = async (query = {}) => {
  const queryString = new URLSearchParams(query).toString();

  const { data } = await client.get(`/posts?${queryString}`);
  return render(data);
};

const tripHtml = (html) => html.replace(/(<([^>]+)>)/gi, "");

function render(posts) {
  const postElm = document.querySelector(".posts");
  let postHtml = ``;
  posts.forEach((post) => {
    postHtml += `<div class="col-6 col-lg-4">
    <div class="post-item border p-3">
      <h3>
        <a class="text-decoration-none" href="#">${tripHtml(post.title)}</a>
      </h3>
      <p>
        ${tripHtml(post.excerpt)}
      </p>
    </div>
  </div>`;
  });

  postElm.innerHTML = `<div class="row g-3">
  ${postHtml}
  </div>`;
}

const query = { title: "", sortBy: "createdAt", order: "desc" };
getPosts(query);

const searchForm = document.querySelector("form");
searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const input = this.querySelector("input");
  query.title = input.value;
  getPosts(query);
  // input.value = "";
});

const sortBy = document.querySelector(".sort-by");
sortBy.addEventListener("change", function () {
  query.order = sortBy.value;
  getPosts(query);
});
