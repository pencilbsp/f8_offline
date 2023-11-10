import { Toaster } from "sonner";
import useAuth from "./hooks/useAuth";

import Cart from "./components/Cart";
import Login from "./components/Login";
import ProductList from "./components/ProductList";

function App() {
  const { isAuthenticated, user, isInitialized } = useAuth();

  return (
    <>
      <header className="h-16 px-4 flex items-center justify-between sticky top-0 border-b bg-white/80 backdrop-blur-lg z-50">
        <span className="text-2xl font-bold">Troll Shop</span>
        <div className="flex gap-3 items-center">
          {user && (
            <div>
              Xin chào: <b>{user.name}</b>
            </div>
          )}

          <Cart />
        </div>
      </header>
      <div className="container mx-auto p-4">
        <Toaster richColors closeButton position="top-right" />

        <ProductList />
        {isInitialized && !isAuthenticated && <Login />}
      </div>
    </>
  );
}

export default App;
