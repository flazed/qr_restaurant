import { createApi } from '@reduxjs/toolkit/query/react';

import { BaseQueryWithAuth } from '@shared/api';
import {
  HasId, NewWaiterOrder, Order, Statuses
} from '@shared/types';

export const ordersApi = createApi({
  baseQuery: BaseQueryWithAuth('orders'),
  endpoints: (builder) => ({
    addAdminOrder: builder.mutation<void, NewWaiterOrder>({
      invalidatesTags: ['Order'],
      query: (body) => ({
        body,
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        url: '/admin'
      })
    }),
    editOrder: builder.mutation<void, HasId & NewWaiterOrder>({
      invalidatesTags: ['Order'],
      query: ({ id, ...body }) => ({
        body,
        headers: { 'Content-Type': 'application/json' },
        method: 'PATCH',
        url: `/admin/${id}`
      })
    }),
    editOrderStatus: builder.mutation<void, { status: Statuses } & HasId>({
      invalidatesTags: ['Order'],
      query: ({ id, ...body }) => ({
        body,
        headers: { 'Content-Type': 'application/json' },
        method: 'PATCH',
        url: `/admin/status/${id}`
      })
    }),
    getOrders: builder.query<Order[], void>({
      providesTags: ['Order'],
      query: () => ''
    })
  }),
  reducerPath: 'ordersApi',
  tagTypes: ['Order']
});

export const {
  useAddAdminOrderMutation,
  useEditOrderMutation,
  useEditOrderStatusMutation,
  useGetOrdersQuery
} = ordersApi;
