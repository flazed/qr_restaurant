import { FC } from 'react';
import { NavLink, useParams } from 'react-router-dom';

import { Chip } from '@nextui-org/react';

import { useGetMenuSectionsListQuery } from '@entities/menu';

import { paths } from '@shared/router';

export const MenuPage: FC = () => {
  const { data: menuSectionList = [] } = useGetMenuSectionsListQuery();

  const { menuId } = useParams();

  return (
    <div className="flex flex-col">
      <div className="p-3 text-amber-50 flex gap-1.5 flex-wrap">
        {menuSectionList.map((x) => (
          <NavLink
            id={x.id}
            to={`${paths.menu.path}/${String(x.id)}`}
          >
            <Chip
              color={x.id === Number(menuId) ? 'primary' : 'danger'}
              variant="shadow"
            >
              {x.name}
            </Chip>
          </NavLink>
        ))}
      </div>
      {menuId}
    </div>
  );
};
