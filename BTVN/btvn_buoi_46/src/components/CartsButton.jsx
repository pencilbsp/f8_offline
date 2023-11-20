import { Fragment, useMemo, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ShoppingCartIcon, XIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { vnd } from "../utils/format";
import { removeProduct } from "../redux/slice/cart";

export default function CartsButton() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { cartList } = useSelector((state) => state.cart);

  const cartCount = useMemo(
    () => cartList.reduce((count, product) => (count += product.quantity), 0),
    [cartList]
  );

  const subtotal = useMemo(
    () => cartList.reduce((total, product) => (total += product.price * product.quantity), 0),
    [cartList]
  );

  return (
    <>
      <button onClick={() => setOpen(!open)} className="relative border rounded-lg px-2 py-1.5">
        <ShoppingCartIcon size={24} />
        <span className="text-sm absolute bg-red-500 rounded-full px-1.5 -top-2 -right-2">
          {cartCount}
        </span>
      </button>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-gray-900">
                            Giỏ hàng
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              className="relative -m-2 p-2 text-gray-400 hover:text-gray-500 focus:outline-none"
                              onClick={() => setOpen(false)}
                            >
                              <span className="absolute -inset-0.5" />
                              <span className="sr-only">Close panel</span>
                              <XIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>

                        <div className="mt-8">
                          <div className="flow-root">
                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                              {cartList.map((product) => (
                                <li key={product._id} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                      src={product.image}
                                      alt={product.name}
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          <a href={`/products/${product._id}`}>{product.name}</a>
                                        </h3>
                                      </div>
                                      <p>Giá: {vnd.format(product.price)}</p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <p className="text-gray-500">Số lượng: {product.quantity}</p>

                                      <div className="flex">
                                        <button
                                          onClick={() => dispatch(removeProduct(product._id))}
                                          className="font-medium text-indigo-600 hover:text-indigo-500"
                                        >
                                          Xoá
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Tổng tiền</p>
                          <p>{vnd.format(subtotal)}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          Phí Vận chuyển và thuế được tính khi thanh toán.
                        </p>
                        <div className="mt-6">
                          <a
                            href="/checkout"
                            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                          >
                            Thanh toán
                          </a>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
