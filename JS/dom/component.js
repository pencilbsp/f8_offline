var component = {
  create: function (name, callback) {
    var Component = function () {
      return Reflect.construct(HTMLElement, [], this.contructor);
    };

    Component.prototype = Object.create(HTMLElement.prototype);
    Component.prototype.contructor = Component;

    Component.prototype.connectedCallback = callback;

    customElements.define(name, Component);
  },
};
