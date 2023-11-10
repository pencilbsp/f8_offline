import request from "../utils/request";

import { createContext, useEffect, useReducer } from "react";

// ----------------------------------------------------------------------

const initialState = {
  products: [],
  cartList: [],
};

function getCartList(cartListIds, products) {
  return cartListIds
    .map(({ _id, quantity }) => {
      const product = products.find((p) => p._id === _id);
      if (!product) return null;
      return { ...product, quantity };
    })
    .filter((p) => !!p);
}

const handlers = {
  INITIALIZE: (state, action) => {
    const { products, cartListIds } = action.payload;

    return {
      ...state,
      products,
      cartList: getCartList(cartListIds, products),
    };
  },
  GET_PRODUCTS: (state, action) => {
    const { products } = action.payload;

    return {
      ...state,
      products,
    };
  },
  ADD_TO_CART: (state, action) => {
    const { products } = action.payload;
    let newCartList = [...state.cartList];

    products.forEach((product) => {
      const index = newCartList.findIndex(({ _id }) => _id === product._id);
      if (index > -1) {
        const currentProduct = newCartList[index];
        newCartList[index] = { ...currentProduct, quantity: currentProduct.quantity + 1 };
      } else {
        newCartList.push({ ...product, quantity: 1 });
      }
    });

    window.localStorage.setItem(
      "cart_list",
      JSON.stringify(newCartList.map(({ _id, quantity }) => ({ _id, quantity })))
    );

    return {
      ...state,
      cartList: newCartList,
    };
  },
  CLEAR_CART: (state, action) => {
    window.localStorage.setItem("cart_list", JSON.stringify([]));
    return { ...state, cartList: [] };
  },
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const ProductContext = createContext({
  ...initialState,
  buy: () => Promise.resolve(),
  addToCart: () => Promise.resolve(),
});

function ProductProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const response = await request.get("/products", {
          params: {
            limit: 16,
          },
        });

        const historyCart = window.localStorage.getItem("cart_list") || "[]";
        const cartListIds = JSON.parse(historyCart);

        dispatch({
          type: "INITIALIZE",
          payload: { products: response.data.data, cartListIds },
        });
      } catch (error) {
        console.log(error.message);
      }
    };

    initialize();
  }, []);

  const addToCart = (productId) => {
    const product = state.products.find(({ _id }) => _id === productId);
    if (product)
      dispatch({
        type: "ADD_TO_CART",
        payload: { products: [product] },
      });
  };

  const buy = async (products) => {
    const orders = products.map(({ _id, quantity }) => ({ productId: _id, quantity }));
    const response = await request.post("/orders", orders);
    dispatch({ type: "CLEAR_CART" });
    return response.data;
  };

  return (
    <ProductContext.Provider
      value={{
        ...state,
        buy,
        addToCart,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export { ProductContext, ProductProvider };
