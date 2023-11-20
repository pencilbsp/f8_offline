import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    return navigate("/products");
  }, []);

  return null;
}

export default App;
