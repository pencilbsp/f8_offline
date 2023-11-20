import { useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CheckIcon, HelpCircleIcon, MinusIcon, PlusIcon, XIcon } from "lucide-react";

import { vnd } from "../utils/format";
import Empty from "../components/Empty";
import { changeQuantity, removeProduct } from "../redux/slice/cart";

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const { cartList } = useSelector((state) => state.cart);
  const refInput = useRef();

  const subtotal = useMemo(
    () => cartList.reduce((total, product) => (total += product.price * product.quantity), 0),
    [cartList]
  );

  const handleChangeQuantity = (productId, event) => {
    const value = event.target.value;
    if (value && Number(value) > 0)
      dispatch(changeQuantity({ productId, quantity: Number(value) }));
  };

  const handleClick = (productId, value) => {
    if (value > 0) {
      refInput.current.value = value;
      dispatch(changeQuantity({ productId, quantity: Number(value) }));
    }
  };

  return (
    <div className="">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Thanh toán giỏ hàng
      </h1>

      <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
        <section aria-labelledby="cart-heading" className="lg:col-span-7">
          <h2 id="cart-heading" className="sr-only">
            Items in your shopping cart
          </h2>

          {cartList.length > 0 ? (
            <ul role="list" className="divide-y divide-gray-200 border-b border-t border-gray-200">
              {cartList.map((product) => (
                <li key={product._id} className="flex py-6 sm:py-10">
                  <div className="flex-shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-xl">
                            <a
                              href={product.href}
                              className="font-medium text-gray-700 hover:text-gray-800"
                            >
                              {product.name}
                            </a>
                          </h3>
                        </div>
                        <p className="mt-1 font-medium text-gray-900">
                          Giá: {vnd.format(product.price)}
                        </p>
                      </div>

                      <div className="mt-4 sm:mt-0 sm:pr-9">
                        <div className="absolute right-0 top-0">
                          <button
                            onClick={() => dispatch(removeProduct(product._id))}
                            className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                          >
                            <span className="sr-only">Remove</span>
                            <XIcon className="h-5 w-5" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-2 flex rounded-md">
                      <button
                        onClick={() => handleClick(product._id, Number(refInput.current.value) - 1)}
                        className="relative -mr-px inline-flex items-center gap-x-1.5 rounded-l-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      >
                        <MinusIcon className="-ml-0.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                      </button>
                      <div className="relative flex items-stretch focus-within:z-10">
                        <input
                          min={1}
                          type="number"
                          ref={refInput}
                          defaultValue={product.quantity}
                          onChange={(e) => handleChangeQuantity(product._id, e)}
                          className="w-[72px] rounded-none border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 focus:outline-none"
                        />
                      </div>
                      <button
                        onClick={() => handleClick(product._id, Number(refInput.current.value) + 1)}
                        className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      >
                        <PlusIcon className="-ml-0.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                      </button>
                    </div>

                    <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                      <CheckIcon
                        className="h-5 w-5 flex-shrink-0 text-green-500"
                        aria-hidden="true"
                      />

                      <span>Còn hàng</span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <Empty />
          )}
        </section>

        {/* Order summary */}
        {cartList.length > 0 && (
          <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
          >
            <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
              Thông tin giỏ hàng
            </h2>

            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Tổng tiền</dt>
                <dd className="text-sm font-medium text-gray-900">{vnd.format(subtotal)}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="flex items-center text-sm text-gray-600">
                  <span>Phí vận chuyển</span>
                  <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Learn more about how shipping is calculated</span>
                    <HelpCircleIcon className="h-5 w-5" aria-hidden="true" />
                  </a>
                </dt>
                <dd className="text-sm font-medium text-gray-900">{vnd.format(30000)}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-base font-medium text-gray-900">Order total</dt>
                <dd className="text-base font-medium text-gray-900">
                  {vnd.format(subtotal + 30000)}
                </dd>
              </div>
            </dl>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                Thanh toán
              </button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
