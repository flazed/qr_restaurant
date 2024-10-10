import { FC, useEffect } from 'react';
import {
  NavLink, useNavigate, useParams
} from 'react-router-dom';

import {
  Button,
  Card, CardBody, CardFooter, Chip, Image, Spinner
} from '@nextui-org/react';

import { useGetMenuSectionsListQuery, useLazyGetMenuByIdQuery } from '@entities/menu';

import { ProductWeight } from '@shared/ui/product-weight';

import { useProduct } from '@shared/hooks';
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
  const {
    addProduct, cart, removeProduct
  } = useProduct();

  useEffect(() => {
    if (menuSectionList.length > 0) {
      if (
        !menuId
        || (
          menuId
          && !menuSectionList
            .find((x) => String(x.id) === menuId)
        )
      ) {
        navigate(`${paths.menu.path}/${menuSectionList[0].id}`);
      } else {
        getMenuById(Number(menuId));
      }
    }
  }, [menuId, menuSectionList.length]);

  return (
    <div className="flex flex-col min-h-[100vh] w-full">
      <div className="p-3 text-amber-50 flex gap-1.5 flex-wrap">
        {menuSectionList.map((x) => (
          <NavLink
            key={x.id}
            to={`${paths.menu.path}/${String(x.id)}`}
          >
            <Chip
              color={x.id === Number(menuId) ? 'primary' : 'default'}
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
                      <CardBody className="overflow-visible p-0 flex-grow-0">
                        <Image
                          alt={product.name}
                          className="w-full h-full object-contain p-3"
                          classNames={{ zoomedWrapper: 'flex items-center h-[200px] border-b-1 border-b-gray-200' }}
                          radius="none"
                          src={product.preview}
                          width="100%"
                          isZoomed
                        />
                      </CardBody>
                      <CardFooter className="justify-between items-start flex-col gap-5 grow-[1]">
                        <div className="flex flex-col gap-2 mb-auto">
                          <b className="text-sm leading-4">{product.name}</b>
                          <p className="text-xs text-default-500">{product.description}</p>
                        </div>
                        <div className="flex gap-3 items-end w-full">
                          {
                            cart.includes(product.id) ? (
                              <Button
                                className="w-full text-amber-50 font-mono"
                                color="danger"
                                onPress={() => removeProduct(product.id)}
                                size="sm"
                              >
                                <i className="fas fa-trash-alt" />
                                Убрать
                              </Button>
                            ) : (
                              <Button
                                className="w-full text-amber-50 font-mono"
                                color="success"
                                onPress={() => addProduct(product.id)}
                                size="sm"
                              >
                                <i className="fas fa-shopping-cart" />
                                {`${product.price} ₽`}
                              </Button>
                            )
                          }
                          <ProductWeight type={product.weightType} weight={product.weight} />
                        </div>
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
