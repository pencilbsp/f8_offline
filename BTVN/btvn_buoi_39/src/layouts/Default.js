export default function DefaultLayout({ body }) {
  return `<header>
      <a href="/" data-navigo>
        Home
      </a>
    </header>
    <main>
      <aside>
        <div>Menu</div>
        <ul class="menu">
          <li>
            <a href="/" data-navigo>Trang chủ</a>
          </li>
          <li>
            <a href="/gioi-thieu" data-navigo>Giới thiệu</a>
          </li>
          <li>
            <a href="/san-pham" data-navigo>Sản phẩm</a>
          </li>
        </ul>
      </aside>
      <div>${body}</div>
    </main>
    <footer>
      <span>Footer</span>
    </footer>`;
}
