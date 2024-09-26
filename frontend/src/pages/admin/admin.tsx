import { FC } from 'react';
import {
  Link, Outlet, useLocation
} from 'react-router-dom';

import { Navbar, NavbarBrand } from '@nextui-org/react';
import classNames from 'classnames';

import { adminPaths } from '@shared/router';

export const AdminPage: FC = () => {
  const location = useLocation();
  const isCurrentRoute = (url: string): boolean => location.pathname === url;

  return (
    <div>
      <Navbar
        className="bg-gray-900 text-amber-50"
        maxWidth="full"
      >
        <NavbarBrand>
          <p className="font-mono text-inherit text-3xl">La&apos;Vita</p>
        </NavbarBrand>
      </Navbar>
      <div className="flex">
        <div className="bg-gray-900 text-amber-50 h-[calc(100vh_-_64px)] w-[200px]">
          <div className="flex flex-col p-3 gap-2">
            {Object.values(adminPaths).map((x) => (
              <Link
                className={classNames(
                  'flex items-center gap-4 py-2 px-3 rounded transition',
                  { 'bg-rose-500': isCurrentRoute(x.path), 'hover:bg-gray-700': !isCurrentRoute(x.path) }
                )}
                key={x.path}
                to={x.path}
              >
                <i className={classNames(x.icon, 'basis-[20px] text-center')} />
                {x.title}
              </Link>
            ))}
          </div>
        </div>
        <div className="p-10 grow-[1]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
