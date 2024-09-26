import { createBrowserRouter } from 'react-router-dom';

import { AdminPage, AdminProductsPage } from '@pages/admin';

import { adminPaths } from './routes';

export const router = createBrowserRouter([
  {
    children: [
      {
        element: <AdminProductsPage />,
        path: adminPaths.adminProducts.path
      }
    ],
    element: <AdminPage />,
    path: adminPaths.adminMain.path
  }
]);
