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

export function router(paths = [], layout) {
  const navigoRouter = new Navigo("/");
  paths.forEach(function ({ path, component }) {
    navigoRouter.on(path, function (data) {
      rootElm.innerHTML = layout({ body: component(data) });
    });
  });

  navigoRouter.resolve();
}
