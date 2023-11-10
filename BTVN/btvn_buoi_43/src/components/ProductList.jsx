import { toast } from "sonner";
import useProduct from "../hooks/useProduct";

export default function ProductList() {
  const { products, addToCart } = useProduct();

  const handleAddToCart = (product) => {
    addToCart(product._id);
    toast.success(product.name + " đã được thêm vào giỏ hàng");
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {products.map((product) => (
        <div key={product._id}>
          <div className="w-full aspect-[2/3] relative overflow-hidden rounded-xl">
            <img className="w-full absolute inset-0 object-cover" src={product.image} alt={product.name} />
          </div>
          <h3 className="text-xl font-semibold mt-1">{product.name}</h3>
          <div className="flex justify-between mt-1.5 items-end">
            <span className="text-orange-500 font-bold">${product.price}</span>
            <button onClick={() => handleAddToCart(product)} className="text-white bg-green-500 rounded-lg px-3 py-2">
              Add to cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
