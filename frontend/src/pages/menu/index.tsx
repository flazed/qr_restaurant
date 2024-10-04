import { FC, useEffect } from 'react';
import {
  NavLink, useNavigate, useParams
} from 'react-router-dom';

import {
  Card, CardBody, CardFooter, Chip, Image, Spinner
} from '@nextui-org/react';

import { useGetMenuSectionsListQuery, useLazyGetMenuByIdQuery } from '@entities/menu';

import { paths } from '@shared/router';

export const MenuPage: FC = () => {
  const { data: menuSectionList = [] } = useGetMenuSectionsListQuery();
  const [
    getMenuById, {
      data: menuSectionData,
      isLoading
    }] = useLazyGetMenuByIdQuery();

  const { menuId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (menuSectionList.length > 0) {
      if (
        !menuId || (menuId && !menuSectionList.find((x) => String(x.id) === menuId))
      ) {
        navigate(`${paths.menu.path}/${menuSectionList[0].id}`);
      } else {
        getMenuById(Number(menuId));
      }
    }
  }, [menuId, menuSectionList.length]);

  return (
    <div className="flex flex-col min-h-[100vh]">
      <div className="p-3 text-amber-50 flex gap-1.5 flex-wrap">
        {menuSectionList.map((x) => (
          <NavLink
            key={x.id}
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
      <div className="p-3 grow-[1] flex">
        {
          isLoading && (
            <div className="grow-[1] flex items-center justify-center">
              <Spinner
                color="danger"
                size="lg"
              />
            </div>
          )
        }
        {
          menuSectionData && (
            <div className="grow-[1]">
              <h1 className="text-3xl font-mono">{menuSectionData.name}</h1>
              <p className="text-medium text-gray-400 mb-5">{menuSectionData.description}</p>
              <div className="grid grid-cols-2 gap-3">
                {
                  menuSectionData.productList.map((product) => (
                    <Card key={product.id}>
                      <CardBody className="overflow-visible p-0">
                        <Image
                          alt={product.name}
                          className="w-full h-[200px] object-contain"
                          classNames={{ wrapper: 'flex items-center border-b-1 border-b-gray-200' }}
                          radius="none"
                          src={product.preview}
                          width="100%"
                        />
                      </CardBody>
                      <CardFooter className="text-small justify-between">
                        <b>{product.name}</b>
                        <p className="text-default-500">{product.price}</p>
                      </CardFooter>
                    </Card>
                  ))
                }
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
};
