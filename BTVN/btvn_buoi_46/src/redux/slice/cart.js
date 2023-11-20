import { createSlice } from "@reduxjs/toolkit";

function saveCart(cartList) {
  try {
    localStorage.setItem("cartList", JSON.stringify(cartList));
  } catch (error) {
    console.log(error.message);
  }
}

function loadLocalCart() {
  try {
    let cartList = [];
    const cartString = localStorage.getItem("cartList");
    if (cartString) cartList = JSON.parse(cartString);
    return cartList;
  } catch (error) {
    console.log(error.message);
    return [];
  }
}

const initialState = {
  cartList: loadLocalCart(),
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const list = [...state.cartList];
      const index = list.findIndex(({ _id }) => _id === action.payload.product._id);

      if (index < 0) {
        list.push({ ...action.payload.product, quantity: action.payload.quantity });
      } else {
        list[index].quantity += action.payload.quantity;
      }

      saveCart(list);
      state.cartList = list;
    },
    changeQuantity: (state, action) => {
      const list = [...state.cartList];
      const index = list.findIndex(({ _id }) => _id === action.payload.productId);

      if (index > -1) {
        list[index].quantity = action.payload.quantity;
        saveCart(list);
        state.cartList = list;
      }
    },
    removeProduct: (state, action) => {
      const list = [...state.cartList];
      const index = list.findIndex(({ _id }) => _id === action.payload);

      if (index > -1) {
        list.splice(index, 1);

        saveCart(list);
        state.cartList = list;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, removeProduct, changeQuantity } = cartSlice.actions;

export default cartSlice.reducer;
