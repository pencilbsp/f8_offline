import Navigo from "navigo";

const rootElm = document.querySelector("#app");

/**
 * @typedef {Object} Path
 * @property {string} path
 * @property {Function} component
 */

/**
 * @param {Path[]} paths
 */

// console.log(process.env.NODE_ENV);
const rootPath = process.env.NODE_ENV === "development" ? "/" : "/BTVN/btvn_buoi_39/dist";

export function router(paths = [], layout) {
  const navigoRouter = new Navigo(rootPath);

  paths.forEach(function ({ path, component }) {
    navigoRouter.on(path, function (data) {
      rootElm.innerHTML = layout({ body: component(data) });
    });
  });

  navigoRouter.on("*", function () {
    rootElm.innerHTML = `<div>
      <h1><span>404</span> - Page not found</h1>
      <a href="/" data-navigo>Về trang chủ</a>
    </div>`;
  });

  navigoRouter.resolve();
}
