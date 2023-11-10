import { toast } from "sonner";
import { useMemo } from "react";
import { ShoppingCartIcon } from "lucide-react";

import cn from "../utils/cn";
import useProduct from "../hooks/useProduct";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";

const vnd = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "vnd",
});

export default function Cart() {
  const { cartList, buy } = useProduct();

  const isEmpty = cartList.length === 0;
  const totalPrice = useMemo(() => cartList.reduce((total, { price, quantity }) => total + price * quantity, 0));

  const handleBuy = () => {
    toast.promise(() => buy(cartList), {
      loading: "Đang thanh toán giỏ hàng...",
      success: "Tất cả sản phầm đã được thành toán",
      error: (error) => error.message || "Thanh toán không thành công",
    });
  };

  return (
    <Popover>
      <PopoverTrigger>
        <button className="border px-2 py-1 rounded-xl relative">
          <ShoppingCartIcon size={20} />
          <span className="absolute -top-2 -left-2 text-white rounded-full bg-red-500/80 px-2 text-sm">
            {cartList.length}
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className={cn(["rounded-xl backdrop-blur-md bg-white/90", !isEmpty && "w-[600px]"])}>
        {!isEmpty ? (
          <>
            <table className="table-auto w-full border-collapse border border-slate-500 rounded-lg text-slate-800">
              <thead>
                <tr className=" bg-slate-200">
                  <th className="px-3 py-2 border border-slate-300 text-left">Tên sản phẩm</th>
                  <th className="px-3 py-2 border border-slate-300 text-right">Số lượng</th>
                  <th className="px-3 py-2 border border-slate-300 text-right">Tổng tiền</th>
                </tr>
              </thead>
              <tbody>
                {cartList.map((product) => (
                  <tr key={product._id}>
                    <td className="px-3 py-2 border border-slate-300">{product.name}</td>
                    <td className="px-3 py-2 border border-slate-300 text-right">{product.quantity}</td>
                    <td className="px-3 py-2 border border-slate-300 text-right">{vnd.format(product.price)}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={3} className="px-3 py-2 border border-slate-300 text-right">
                    {vnd.format(totalPrice)}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="mt-3 w-full flex justify-end">
              <button onClick={handleBuy} className="bg-green-500 text-white px-3 py-2">
                Thanh toán giỏ hàng
              </button>
            </div>
          </>
        ) : (
          <p className="font-bold">Giỏ hàng chưa có gì!</p>
        )}
      </PopoverContent>
    </Popover>
  );
}
