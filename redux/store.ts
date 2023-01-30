import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import cartSlice from "./slice/cartSlice";
import orderSlice from "./slice/orderSlice";
import productSlice from "./slice/productSlice";
import shopsSlice from "./slice/shopsSlice";

const store = configureStore({
  reducer: {
    cart: cartSlice,
    products: productSlice,
    shops: shopsSlice,
    auth: authSlice,
    order: orderSlice,
  },
});

export default store

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;