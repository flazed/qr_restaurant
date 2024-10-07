import { createApi } from '@reduxjs/toolkit/query/react';

import { BaseQueryWithAuth } from '@shared/api';
import { Order } from '@shared/types';

export const ordersApi = createApi({
  baseQuery: BaseQueryWithAuth('orders'),
  endpoints: (builder) => ({
    getOrders: builder.query<Order[], void>({
      providesTags: ['Order'],
      query: () => ''
    })
  }),
  reducerPath: 'ordersApi',
  tagTypes: ['Order']
});

export const { useGetOrdersQuery } = ordersApi;
