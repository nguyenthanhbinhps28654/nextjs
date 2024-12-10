// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './slices/cartslice'; // Đảm bảo import đúng cartSlice

export const store = configureStore({
  reducer: {
    cart: cartSlice,  // Đảm bảo `cartSlice` là chính xác
  },
});
