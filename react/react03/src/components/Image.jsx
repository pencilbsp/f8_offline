import { forwardRef, useRef, useImperativeHandle } from "react";

function Image(_, ref) {
  const imageRef = useRef();
  useImperativeHandle(ref, () => {
    return {
      zoomIn() {
        imageRef.current.style.width = "300px";
      },
      zoomOut() {
        imageRef.current.style.width = "";
      },
    };
  });

  return (
    <div>
      <img ref={imageRef} src="https://picsum.photos/200" alt="" />
    </div>
  );
}

export default forwardRef(Image);
