import { useLoaderData } from "react-router-dom";
import { HeartIcon, StarIcon } from "lucide-react";

import request from "../utils/request";
import { vnd } from "../utils/format";
import Breadcrumb from "../components/Breadcrumb";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slice/cart";

export async function loader({ params }) {
  const response = await request.get(`/products/${params.productId}`);
  return { product: response.data.data };
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductPage() {
  const dispatch = useDispatch();
  const { product } = useLoaderData();

  return (
    <div className="">
      <Breadcrumb pages={[{ name: product.name, href: "#", current: true }]} />

      <div className="py-4">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          <div className="aspect-square w-full h-full min-w-[200px] max-w-xs">
            <div className="rounded-2xl overflow-hidden border">
              <span className="sr-only">{product.name}</span>
              <img
                alt={product.name}
                src={product.image}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>

          {/* Product info */}
          <div className="">
            <h3 className="text-indigo-500 text-xl">{product.brand}</h3>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.name}</h1>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">{vnd.format(product.price)}</p>
            </div>

            {/* Reviews */}
            <div className="mt-3">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        product.rating > rating ? "text-indigo-500" : "text-gray-300",
                        "h-5 w-5 flex-shrink-0"
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">{product.rating} out of 5 stars</p>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="sr-only">Description</h3>

              <div
                className="space-y-4 text-base text-gray-700"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>

            <section aria-labelledby="details-heading" className="mt-4">
              <h2 id="details-heading" className="sr-only">
                Additional details
              </h2>
              <div>
                <h3 className="text-gray-700">
                  Danh mục: <span className="text-indigo-500">{product.category}</span>
                </h3>
              </div>
            </section>

            <div className="mt-4">
              <div className="flex">
                <button
                  onClick={() => dispatch(addToCart({ product, quantity: 1 }))}
                  className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                >
                  Thêm vào giỏ hàng
                </button>

                <button className="border ml-4 flex items-center justify-center rounded-md px-3 py-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
                  <HeartIcon className="h-6 w-6 flex-shrink-0" aria-hidden="true" />
                  <span className="sr-only">Add to favorites</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
