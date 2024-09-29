import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    autherized: false,
    cartSize: 0,
    cart: null,
  },

  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
      state.autherized = true;
    },
    removeUser: (state, action) => {
      state.user = null;
      state.autherized = false;
    },
    isAutherized: (state, action) => {
      state.autherized = action.payload;
    },
    isCartSize: (state, action) => {
      state.cartSize = action.payload;
    },
    zeroCartSize: (state) => {
      state.cartSize = 0;
    },
    addToCart: (state, action) => {
      state.cart = action.payload
    },
    removeCart: (state) => {
      state.cart = null;
    },
  },
});

export const { isAutherized, addUser, removeUser, isCartSize, addToCart, removeCart, zeroCartSize } =
  userSlice.actions;
export default userSlice.reducer;
