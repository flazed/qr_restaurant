export const adminPaths = {
  adminMain: {
    icon: 'fas fa-home',
    isAdmin: false,
    path: '/admin',
    title: 'Главная'
  },
  adminMenu: {
    icon: 'fas fa-th',
    isAdmin: true,
    path: '/admin/menu',
    title: 'Меню'
  },
  adminOrders: {
    icon: 'fas fa-dollar-sign',
    isAdmin: false,
    path: '/admin/orders',
    title: 'Заказы'
  },
  adminProducts: {
    icon: 'fas fa-pizza-slice',
    isAdmin: true,
    path: '/admin/products',
    title: 'Продукты'
  },
  adminUsers: {
    icon: 'fas fa-users',
    isAdmin: true,
    path: '/admin/users',
    title: 'Пользователи'
  }
};

export const paths = {
  login: {
    path: '/login',
    title: 'Логин'
  },
  menu: {
    path: '/menu',
    title: 'menu'
  },
  ...adminPaths
};
