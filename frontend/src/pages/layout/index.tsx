import { FC } from 'react';
import {
  Link, Outlet, useLocation
} from 'react-router-dom';

import classNames from 'classnames';

import { userPaths } from '@shared/router';

export const IndexLayout: FC = () => {
  const location = useLocation();

  const isRouteActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.includes(path);
  };

  return (
    <div className="min-h-[100vh] pb-[68px] flex w-full max-w-[768px] mx-auto border-l-gray-300 border-r-gray-300 border-l-1 border-r-1">
      <Outlet />
      <div className="fixed w-full bottom-0 bg-neutral-800 grid grid-cols-4 gap-1 z-20  max-w-[768px]">
        {Object.values(userPaths).map((x) => (
          <Link
            className={classNames(
              'flex flex-col justify-center items-center gap-1 p-2 transition-all',
              { 'text-orange-700': isRouteActive(x.path) },
              { 'text-white': !isRouteActive(x.path) }
            )}
            key={x.path}
            to={x.path}
          >
            <i className={classNames(x.icon, 'text-2xl')} />
            <span className="text-xs">{x.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};
