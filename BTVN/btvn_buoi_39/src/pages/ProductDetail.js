export default function ProductDetail({ data }) {
  const productId = data.id;
  return `<h1>Chi tiết sản phẩm ${productId}</h1>`;
}
