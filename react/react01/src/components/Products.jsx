export default function Products({ name, price, onBuy }) {
  return (
    <div>
      <p>{name}</p>
      <p>{price}</p>
      <button onClick={onBuy}>Mua</button>
    </div>
  );
}
