import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";

import HomePage from "./routes/Home";
import { store } from "./redux/store";

import NotFound from "./components/404";
import Header from "./components/Header";
import CheckoutPage from "./routes/Checkout";
import ProductListPage from "./routes/ProductList";
import ProductPage, { loader as productLoader } from "./routes/Product";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <NotFound />,
  },
  {
    path: "products",
    element: <ProductListPage />,
  },
  {
    path: "checkout",
    element: <CheckoutPage />,
  },
  {
    path: "products/:page",
    element: <ProductListPage />,
  },
  {
    path: "products/detail/:productId",
    element: <ProductPage />,
    loader: productLoader,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Header />
      <main className="container px-6 max-w-7xl">
        <main>
          <RouterProvider router={router} />
        </main>
      </main>
    </Provider>
  </React.StrictMode>
);
