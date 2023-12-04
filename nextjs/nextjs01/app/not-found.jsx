import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div>
      <h1>Trang web không tồn tại</h1>
      <h2>Lạc đường rồi, quay lại trang chủ đê...</h2>
      <Link href="/">Trang chủ</Link>
    </div>
  );
}
