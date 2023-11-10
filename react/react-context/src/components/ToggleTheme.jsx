import { useContext } from "react";
import { AppContext } from "../App";

export default function ToggleTheme() {
  const context = useContext(AppContext);

  const handleToggleTheme = () => {
    context.toggleTheme();
  };

  return (
    <div className={`theme${context.theme === "dark" ? " dark" : ""}`}>
      <button onClick={handleToggleTheme}>{context.theme === "light" ? "Light" : "Dark"}</button>
    </div>
  );
}
