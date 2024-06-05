import { configureStore } from "@reduxjs/toolkit";
import CountSlice from "./count-slice/count";

export const store = configureStore({
  reducer: {
    count: CountSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;