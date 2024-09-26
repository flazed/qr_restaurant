import { createApi } from '@reduxjs/toolkit/query/react';

import { BaseQueryWithAuth } from '@shared/api';
import { Product, ProductWithoutID } from '@shared/types';

export const productApi = createApi({
  baseQuery: BaseQueryWithAuth('products'),
  endpoints: (builder) => ({
    addProduct: builder.mutation<void, ProductWithoutID>({
      invalidatesTags: ['Product'],
      query: (body) => ({
        body,
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        url: ''
      })
    }),
    getProducts: builder.query<Product[], void>({
      providesTags: ['Product'],
      query: () => ''
    })
  }),
  reducerPath: 'productApi',
  tagTypes: ['Product']
});

export const { useAddProductMutation, useGetProductsQuery } = productApi;
