import { createApi } from '@reduxjs/toolkit/query/react';

import { BaseQueryWithAuth } from '@shared/api';
import { JWTToken, User } from '@shared/types';

export const userApi = createApi({
  baseQuery: BaseQueryWithAuth('user'),
  endpoints: (builder) => ({
    loginUser: builder.mutation<JWTToken, User>({
      query: (body) => ({
        body,
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        url: '/login'
      })
    })
  }),
  reducerPath: 'userApi'
});

export const { useLoginUserMutation } = userApi;
