export const adminPaths = {
  adminMain: {
    icon: 'fas fa-home',
    path: '/admin',
    title: 'Главная'
  },
  adminMenu: {
    icon: 'fas fa-th',
    path: '/admin/menu',
    title: 'Меню'
  },
  adminOrders: {
    icon: 'fas fa-dollar-sign',
    path: '/admin/orders',
    title: 'Заказы'
  },
  adminProducts: {
    icon: 'fas fa-pizza-slice',
    path: '/admin/products',
    title: 'Продукты'
  }
};

export const paths = {
  login: {
    path: '/login',
    title: 'Логин'
  },
  ...adminPaths
};
