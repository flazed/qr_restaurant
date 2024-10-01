import { createBrowserRouter } from 'react-router-dom';

import {
  AdminPage, AdminProductsPage, AdminUsersPage
} from '@pages/admin';
import { LoginPage } from '@pages/login';

import { paths } from './routes';

export const router = createBrowserRouter([
  {
    children: [
      {
        element: <AdminProductsPage />,
        path: paths.adminProducts.path
      },
      {
        element: <AdminUsersPage />,
        path: paths.adminUsers.path
      }
    ],
    element: <AdminPage />,
    path: paths.adminMain.path
  },
  {
    element: <LoginPage />,
    path: paths.login.path
  }
]);
