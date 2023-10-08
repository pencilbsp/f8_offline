class MagicZoom {
  constructor(container, options) {
    this.container = container;
    this.image = container.children[0];

    Object.assign(this.container.style, {
      display: "block",
      position: "relative",
      width: this.image.width + "px",
      height: this.image.height + "px",
    });

    this.lens = {
      width: 0,
      height: 0,
      elm: document.createElement("div"),
    };

    this.zoomImage = {
      width: 0,
      height: 0,
      elm: document.createElement("div"),
    };

    this.scaleX = this.image.naturalWidth / this.image.width;
    this.scaleY = this.image.naturalHeight / this.image.height;
    this.offset = this.getOffset(this.image);

    if (options.zoomWidth) {
      this.zoomImage.width = options.zoomWidth;
      this.zoomImage.height = this.image.height;

      this.lens.width = options.zoomWidth / this.scaleX;
      this.lens.height = this.image.height / this.scaleY;
    } else {
      this.zoomImage.width = this.image.width * options.scale;
      this.zoomImage.height = this.image.height * options.scale;

      this.lens.width = this.image.width / (this.image.naturalWidth / (this.image.width * options.scale));
      this.lens.height = this.image.height / (this.image.naturalHeight / (this.image.height * options.scale));
    }

    this.start();
  }

  events = {
    handleEvent: function (event) {
      switch (event.type) {
        case "click":
          return this.handleClick(event);
        case "mousemove":
          return this.handleMouseMove(event);
        case "mouseenter":
          return this.handleMouseEnter(event);
        case "mouseleave":
          return this.handleMouseLeave(event);
      }
    },
    handleMouseMove: (event) => {
      if (this.offset) {
        const offsetX = this.zoomLensLeft(event.clientX - this.offset.left);
        const offsetY = this.zoomLensTop(event.clientY - this.offset.top);
        const backgroundTop = offsetX * this.scaleX;
        const backgroundRight = offsetY * this.scaleY;
        const backgroundPosition = `-${backgroundTop}px -${backgroundRight}px`;
        this.zoomImage.elm.style.backgroundPosition = backgroundPosition;
        this.lens.elm.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      }
    },
    handleMouseEnter: () => {
      this.lens.elm.style.display = "block";
      this.zoomImage.elm.style.display = "block";
    },
    handleMouseLeave: () => {
      this.lens.elm.style.display = "none";
      this.zoomImage.elm.style.display = "none";
    },
    handleClick: function (event) {
      event.preventDefault();
    },
  };

  start() {
    Object.assign(this.lens.elm.style, {
      top: 0,
      left: 0,
      opacity: 0.4,
      display: "none",
      position: "absolute",
      backgroundColor: "white",
      width: this.lens.width + "px",
      height: this.lens.height + "px",
    });
    this.container.appendChild(this.lens.elm);

    Object.assign(this.zoomImage.elm.style, {
      display: "none",
      backgroundRepeat: "no-repeat",
      width: this.zoomImage.width + "px",
      height: this.zoomImage.height + "px",
      backgroundImage: `url(${this.image.src})`,
    });
    this.container.appendChild(this.zoomImage.elm);

    this.container.addEventListener("click", this.events, false);
    this.container.addEventListener("mousemove", this.events, false);
    this.container.addEventListener("mouseenter", this.events, false);
    this.container.addEventListener("mouseleave", this.events, false);
  }

  leftLimit(min) {
    return this.image.width - min;
  }

  topLimit(min) {
    return this.image.height - min;
  }

  getValue(val, min, max) {
    if (val < min) return min;
    if (val > max) return max;
    return val;
  }

  getPosition(v, min, max) {
    const value = this.getValue(v, min, max);
    return value - min;
  }

  zoomLensLeft(left) {
    const leftMin = this.lens.width / 2;
    return this.getPosition(left, leftMin, this.leftLimit(leftMin));
  }

  zoomLensTop(top) {
    const topMin = this.lens.height / 2;
    return this.getPosition(top, topMin, this.topLimit(topMin));
  }

  getOffset(elm) {
    const bounding = elm.getBoundingClientRect();
    return { left: bounding.left, top: bounding.top };
  }
}
