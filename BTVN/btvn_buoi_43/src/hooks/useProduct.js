import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
//

// ----------------------------------------------------------------------

const useProduct = () => {
  const context = useContext(ProductContext);

  if (!context) throw new Error("Product context must be use inside ProductProvider");

  return context;
};

export default useProduct;
