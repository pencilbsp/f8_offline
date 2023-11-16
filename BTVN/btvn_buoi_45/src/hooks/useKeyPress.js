import { useEffect } from "react";

export default function useKeyPress(keyName, callback, options) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      const code = event.which || event.keyCode;
      const isKeyCode = typeof keyName === "number";
      const charCode = String.fromCharCode(code).toLowerCase();
      const match = isKeyCode ? code === keyName : keyName === charCode;

      let toggle = false;
      if (options)
        Object.keys(options).forEach((key) => {
          toggle = event[key] === options[key] && match;
        });
      else toggle = match;
      toggle && callback(event);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [keyName, callback, options]);
}
