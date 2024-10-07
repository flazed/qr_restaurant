import { FC } from 'react';

import { useGetOrdersQuery } from '@entities/order';

export const AdminOrdersPage: FC = () => {
  const { data: ordersList } = useGetOrdersQuery();

  return (
    <div>
      {}
    </div>
  );
};
