import { configureStore } from '@reduxjs/toolkit';

import { productApi, productSlice } from '@entities/product';
import { userApi, userSlice } from '@entities/user';

export const store = configureStore({
  middleware: (getDefaultMiddleware) => (
    getDefaultMiddleware()
      .concat(productApi.middleware)
      .concat(userApi.middleware)
  ),
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    [productSlice.name]: productSlice.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [userSlice.name]: userSlice.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
