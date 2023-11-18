import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchProducts } from "../redux/slice/product";
import Product from "./Product";

export default function ProductList() {
  const dispatch = useDispatch();
  const { products, status, totalPage } = useSelector((state) => state.product);
  console.log(products, totalPage);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status]);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-xl font-bold text-gray-900">Customers also bought</h2>

        <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
