import { configureStore } from '@reduxjs/toolkit';

import { productApi, productSlice } from '@entities/product';

export const store = configureStore({
  middleware: (getDefaultMiddleware) => (
    getDefaultMiddleware()
      .concat(productApi.middleware)
  ),
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    [productSlice.name]: productSlice.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
