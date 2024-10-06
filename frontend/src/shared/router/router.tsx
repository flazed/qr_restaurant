import { createBrowserRouter } from 'react-router-dom';

import {
  AdminMenuPage,
  AdminPage,
  AdminProductsPage,
  AdminUsersPage
} from '@pages/admin';
import { CartPage } from '@pages/cart';
import { IndexLayout } from '@pages/layout';
import { LoginPage } from '@pages/login';
import { MainPage } from '@pages/main';
import { MenuPage } from '@pages/menu';
import { OrderPage } from '@pages/order';

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
    children: [
      {
        element: <MainPage />,
        path: paths.main.path
      },
      {
        element: <MenuPage />,
        path: paths.menu.path
      },
      {
        element: <CartPage />,
        path: paths.cart.path
      },
      {
        element: <OrderPage />,
        path: paths.order.path
      },
      {
        element: <MenuPage />,
        path: `${paths.menu.path}/:menuId`
      }
    ],
    element: <IndexLayout />
  },
  {
    element: <LoginPage />,
    path: paths.login.path
  }
]);
