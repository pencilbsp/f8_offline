import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Product from "../components/Product";
import { useParams } from "react-router-dom";
import { ACTION_STATE } from "../utils/config";
import Pagination from "../components/Pagination";
import { fetchProducts } from "../redux/slice/product";

export default function ProductList() {
  const dispatch = useDispatch();
  const { page } = useParams();
  const { products, status, totalPage } = useSelector((state) => state.product);

  useEffect(() => {
    if (status !== ACTION_STATE.LOADING) {
      dispatch(fetchProducts({ page: Number(page || 1) }));
    }
  }, [page]);

  return (
    <div className="">
      <h2 className="text-3xl font-bold text-gray-900">Danh sách sản phẩm</h2>

      <div className="my-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>

      <Pagination count={totalPage} page={Number(page || 1)} />
    </div>
  );
}
