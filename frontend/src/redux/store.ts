import { configureStore } from "@reduxjs/toolkit";
import CountSlice from "./count-slice/count";
import OrderSlice from "./slice/order-slice";

// 
export const store = configureStore({
  reducer: {
    count: CountSlice,
    order: OrderSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;