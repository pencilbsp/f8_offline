import { useRef } from "react";
import Image from "./Image";

export default function Control() {
  const imageRef = useRef();

  const handleZoomIn = () => {
    imageRef.current.zoomIn();
  };

  const handleZoomOut = () => {
    imageRef.current.zoomOut();
  };

  return (
    <div>
      <Image ref={imageRef} />
      <button onClick={handleZoomIn}>ZoomIn</button>
      <button onClick={handleZoomOut}>ZoomOut</button>
    </div>
  );
}
