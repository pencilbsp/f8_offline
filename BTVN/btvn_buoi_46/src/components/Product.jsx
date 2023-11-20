import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { vnd } from "../utils/format";
import { addToCart } from "../redux/slice/cart";

export default function Product({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity: 1 }));
  };

  return (
    <div>
      <div className="relative">
        <div className="relative h-72 w-full overflow-hidden rounded-lg">
          <img
            alt={product.name}
            src={product.image}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="relative mt-4">
          <Link to={`/products/detail/${product._id}`}>
            <h3 className="font-bold text-gray-900">{product.name}</h3>
          </Link>
        </div>
        <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
          />
          <p className="relative text-lg font-semibold text-white">{vnd.format(product.price)}</p>
        </div>
      </div>
      <div className="mt-6">
        <button
          onClick={handleAddToCart}
          className="w-full relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 py-2 px-8 text-sm font-medium text-gray-900 hover:bg-gray-200"
        >
          Thêm vào giỏ hàng<span className="sr-only">, {product.name}</span>
        </button>
      </div>
    </div>
  );
}
