import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
      state.quantity += parseInt(action.payload.quantity);
      state.total += action.payload.totalPrice * action.payload.quantity;
    },
    removeProduct: (state, action) => {
      state.products.splice(action.payload.index, 1)
      state.quantity -= parseInt(action.payload.quantity)
      state.total -= action.payload.totalPrice * parseInt(action.payload.quantity)
    },
    reset: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
});

export const { addProduct, removeProduct, reset } = cartSlice.actions;
export default cartSlice.reducer;