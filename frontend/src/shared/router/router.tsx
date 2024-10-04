import { createBrowserRouter } from 'react-router-dom';

import {
  AdminMenuPage,
  AdminPage,
  AdminProductsPage,
  AdminUsersPage
} from '@pages/admin';
import { LoginPage } from '@pages/login';
import { MenuPage } from '@pages/menu';

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
      },
      {
        element: <AdminMenuPage />,
        path: paths.adminMenu.path
      }
    ],
    element: <AdminPage />,
    path: paths.adminMain.path
  },
  {
    element: <LoginPage />,
    path: paths.login.path
  },
  {
    element: <MenuPage />,
    path: `${paths.menu.path}/:menuId`
  }
]);
