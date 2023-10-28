import { router } from "./utils/router";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import DefaultLayout from "./layouts/Default";

export function App() {
  return router(
    [
      {
        path: "/",
        component: Home,
      },
      {
        path: "/gioi-thieu",
        component: About,
      },
      {
        path: "/san-pham",
        component: Products,
      },
      {
        path: "/san-pham/:id",
        component: ProductDetail,
      },
    ],
    DefaultLayout
  );
}
