export default function ProductDetail({ data }) {
  const productId = data.id;
  return `<div>
    <h1>Chi tiết sản phẩm ${productId}</h1>
    <a href="/san-pham" data-navigo>Quay lại</a>
  </div>`;
}
