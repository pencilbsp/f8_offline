import Link from "next/link";

export default function Navtigation() {
  return (
    <ul className="flex gap-3">
      <ul>
        <Link href="/">Trang chủ</Link>
      </ul>
      <ul>
        <Link href="/about">Giới thiệu</Link>
      </ul>
      <ul>
        <Link href="/products">Sản phẩm</Link>
      </ul>
      <ul>
        <Link href="/auth/login">Đăng nhập</Link>
      </ul>
    </ul>
  );
}
