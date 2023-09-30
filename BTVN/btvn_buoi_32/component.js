/**
 *
 * @typedef {Object} ComponentPayload
 * @property {VoidFunction|undefined} data
 * @property {string} templace
 */

const evaluate = (context, expr) => {
  const keys = Object.keys(context);
  const result = Function(keys.join(","), expr + ";return arguments;")(...Object.values(context));
  if (!result) return context;
  return Object.values(result).reduce((res, value, index) => Object.assign(res, { [keys[index]]: value }), context);
};

class F8 {
  static matcher = /\{\{\s{0}(.*?)\s{0}\}\}/g;

  /**
   *
   * @param {string} tagName
   * @param {ComponentPayload} componentPayload
   */
  static component = (tagName, { data, templace }) => {
    customElements.get(tagName) ||
      customElements.define(
        tagName,
        class extends HTMLElement {
          constructor() {
            super();
            this.templace = templace;
            this.values = data?.() || {};
          }

          render() {
            const templaceElm = document.createElement("template");
            templaceElm.innerHTML = this.templace.replace(F8.matcher, (_, value) => {
              return this.values[value.trim()];
            });

            this.innerHTML = "";
            this.append(templaceElm.content.cloneNode(true));
            // templaceElm.remove();
            this.bindEvent();
          }

          bindEvent() {
            [...this.querySelectorAll("*")].forEach((elm) => {
              Array.from(elm.attributes).forEach(({ name, value: expr }) => {
                if (name.startsWith("v-on:")) {
                  const [, eventName] = name.split(":");
                  elm.addEventListener(eventName, () => {
                    this.values = evaluate(this.values, expr);
                    this.render();
                  });
                }
              });
            });
          }

          connectedCallback() {
            this.render();
          }

          disconnectedCallback() {}

          adoptedCallback() {}

          attributeChangedCallback(name, oldValue, newValue) {}
        }
      );
  };
}
