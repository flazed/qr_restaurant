import {
  FC, useEffect, useState
} from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  Button, Chip, Image, Input,
  Modal, ModalBody, ModalContent,
  ModalFooter, ModalHeader, Select,
  SelectItem, Table, TableBody,
  TableCell, TableColumn, TableHeader,
  TableRow, Textarea, getKeyValue,
  useDisclosure
} from '@nextui-org/react';

import {
  defaultProduct, useAddProductMutation, useGetProductsQuery
} from '@entities/product';

import { useUser } from '@shared/hooks';
import { paths } from '@shared/router';
import {
  Product, ProductWithoutID, WeightType
} from '@shared/types';

import { columns } from './products.table';

export const AdminProductsPage: FC = () => {
  const { data: productList = [] } = useGetProductsQuery();
  const [addProduct, { isLoading }] = useAddProductMutation();

  const {
    isOpen, onClose, onOpen, onOpenChange
  } = useDisclosure();
  const {
    isOpen: isAlertOpen,
    onClose: alertOnClose,
    onOpen: alertOnOpen,
    onOpenChange: alertOnOpenChange
  } = useDisclosure();

  const {
    clearErrors,
    control,
    formState: { errors },
    handleSubmit,
    setValue
  } = useForm<ProductWithoutID>({ defaultValues: defaultProduct });

  const [productID, setProductID] = useState<null | number>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [productPreview, setProductPreview] = useState<string>('');
  const { isAdmin } = useUser();
  const navigate = useNavigate();

  const handleCloseProductModal = () => {
    onClose();
    clearErrors();
    setIsEdit(false);
    setProductPreview('');
    Object
      .entries(defaultProduct)
      .map(([key, value]) => setValue(key as keyof ProductWithoutID, value));
  };

  const handleAlertClose = () => {
    alertOnClose();
    if (!isError) handleCloseProductModal();
  };

  const handleControlProduct = (form: ProductWithoutID) => {
    const formattedData = { ...form };

    formattedData.name = form.name.trim();
    formattedData.description = form.description.trim();
    formattedData.price = Number(form.price);
    formattedData.weight = Number(form.weight);
    formattedData.weightType = Number(form.weightType);
    formattedData.inStopList = Boolean(form.inStopList);

    if (
      typeof form.preview === 'string'
      && form.preview.trim().length === 0
    ) {
      delete formattedData.preview;
    }

    if (!isEdit) {
      addProduct(formattedData)
        .unwrap()
        .then(() => setIsError(false))
        .catch(() => setIsError(true))
        .finally(() => {
          alertOnOpen();
        });
    }
  };

  const handleOpenProductEditModal = (x: Product) => {
    const { id, ...data } = x;

    setProductID(id);
    Object
      .entries(data)
      .map(([key, value]) => setValue(key as keyof ProductWithoutID, value));
    if (data.preview) setProductPreview(data.preview);
    setIsEdit(true);
    onOpen();
  };

  const renderCell = (row: Product, columnKey: number | string) => {
    if (columnKey === 'inStopList') {
      if (row.inStopList) {
        return <Chip color="danger" variant="flat">true</Chip>;
      }
      return <Chip color="success" variant="flat">false</Chip>;
    }

    if (columnKey === 'price') {
      return <span>{`${row.price} ₽`}</span>;
    }

    if (columnKey === 'actions') {
      return (
        <div className="inline-flex gap-3">
          <Button
            color="warning"
            onClick={() => handleOpenProductEditModal(row)}
            variant="flat"
            isIconOnly
          >
            <i className="far fa-edit translate-x-0.5" />
          </Button>
          <Button color="danger" variant="flat" isIconOnly>
            <i className="fas fa-trash-alt" />
          </Button>
        </div>
      );
    }

    return getKeyValue(row, columnKey);
  };

  useEffect(() => {
    if (!isAdmin()) navigate(paths.adminMain.path);
  }, []);

  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="flex justify-end">
          <Button
            color="primary"
            endContent={<i className="fas fa-plus" />}
            onPress={onOpen}
            variant="shadow"
          >
            Добавить блюдо
          </Button>
        </div>
        <Table aria-label="products table">
          <TableHeader>
            {columns.map((column) => (
              <TableColumn key={column.key}>
                {column.label}
              </TableColumn>
            ))}
          </TableHeader>
          <TableBody emptyContent="Пока блюд нет">
            {productList.map((x) => (
              <TableRow key={x.id}>
                {(columnKey) => (
                  <TableCell>
                    {renderCell(x, columnKey)}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Modal
        isOpen={isOpen}
        onClose={handleCloseProductModal}
        onOpenChange={onOpenChange}
        size="3xl"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            <span>
              {isEdit ? 'Редактирование' : 'Создание'}
              {' '}
              блюда
            </span>
          </ModalHeader>
          <ModalBody>
            <form
              className="flex flex-col gap-4"
              id="add-new-product"
              onSubmit={handleSubmit(handleControlProduct)}
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-4">
                  <Controller
                    render={({ field: { onChange, value } }) => (
                      <Input
                        errorMessage={errors.name?.message}
                        isInvalid={Boolean(errors.name?.message)}
                        label="Название"
                        onChange={onChange}
                        placeholder="Название блюда"
                        value={value}
                        isRequired
                      />
                    )}
                    control={control}
                    name="name"
                    rules={{ required: 'Поле обязательно для заполнения' }}
                  />
                  <Controller
                    render={({ field: { onChange, value } }) => (
                      <Textarea
                        classNames={{
                          base: 'h-full',
                          input: 'h-full',
                          inputWrapper: 'grow-[1]'
                        }}
                        errorMessage={errors.description?.message}
                        isInvalid={Boolean(errors.description?.message)}
                        label="Описание"
                        onChange={onChange}
                        placeholder="Описание блюда"
                        value={value}
                        disableAutosize
                        isRequired
                      />
                    )}
                    control={control}
                    name="description"
                    rules={{ required: 'Поле обязательно для заполнения' }}
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex gap-4">
                    <Controller
                      render={({ field: { onChange, value } }) => (
                        <Input
                          errorMessage={errors.weight?.message}
                          isInvalid={Boolean(errors.weight?.message)}
                          label="Вес"
                          onChange={onChange}
                          placeholder="Вес блюда"
                          type="number"
                          value={String(value)}
                          isRequired
                        />
                      )}
                      rules={{
                        min: { message: 'Минимальный вес 1 гр/мл', value: 1 },
                        required: 'Поле обязательно для заполнения'
                      }}
                      control={control}
                      name="weight"
                    />
                    <Controller
                      render={({ field: { onChange, value } }) => (
                        <Select
                          errorMessage={errors.weightType?.message}
                          isInvalid={Boolean(errors.weightType?.message)}
                          label="Выберете тип веса"
                          onChange={(x) => onChange(x.target.value)}
                          selectedKeys={[String(value)]}
                          isRequired
                        >
                          <SelectItem key={WeightType.Gramm}>
                            грамм
                          </SelectItem>
                          <SelectItem key={WeightType.Milligramm}>
                            миллиграмм
                          </SelectItem>
                        </Select>
                      )}
                      control={control}
                      name="weightType"
                      rules={{ required: 'Поле обязательно для заполнения' }}
                    />
                  </div>
                  <Controller
                    render={({ field: { onChange, value } }) => (
                      <Input
                        errorMessage={errors.price?.message}
                        isInvalid={Boolean(errors.price?.message)}
                        label="Цена"
                        onChange={onChange}
                        placeholder="Цена блюда"
                        type="number"
                        value={String(value)}
                        isRequired
                      />
                    )}
                    rules={{
                      min: { message: 'Минимальная цена 1 рубль', value: 1 },
                      required: 'Поле обязательно для заполнения'
                    }}
                    control={control}
                    name="price"
                  />
                  <Controller
                    render={({ field: { onChange, value } }) => (
                      <Select
                        onChange={(x) => {
                          if (x.target.value !== '') {
                            onChange(x.target.value === 'true');
                          } else {
                            onChange('');
                          }
                        }}
                        errorMessage={errors.inStopList?.message}
                        isInvalid={Boolean(errors.inStopList?.message)}
                        label="Стоп-лист"
                        selectedKeys={[String(value)]}
                        isRequired
                      >
                        <SelectItem key="true">
                          Да
                        </SelectItem>
                        <SelectItem key="false">
                          Нет
                        </SelectItem>
                      </Select>
                    )}
                    control={control}
                    name="inStopList"
                    rules={{ validate: { checkBool: (x) => typeof x === 'boolean' || 'Поле обязательно для заполнения' } }}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <Controller
                  render={({ field: { onChange, value } }) => (
                    <Input
                      onChange={(x) => {
                        onChange(x);
                        setProductPreview(x.target.value);
                      }}
                      errorMessage={errors.preview?.message}
                      isInvalid={Boolean(errors.preview?.message)}
                      label="Фото"
                      placeholder="https://path-to/image.png"
                      value={value}
                    />
                  )}
                  control={control}
                  name="preview"
                />
                {productPreview.trim().length > 0 && (
                  <div className="flex justify-center">
                    <Image
                      src={productPreview}
                      width={300}
                    />
                  </div>
                )}
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              onPress={handleCloseProductModal}
              variant="light"
            >
              Закрыть
            </Button>
            <Button
              color="primary"
              form="add-new-product"
              isLoading={isLoading}
              type="submit"
            >
              {isEdit ? 'Редактировать' : 'Добавить'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={isAlertOpen}
        onClose={handleAlertClose}
        onOpenChange={alertOnOpenChange}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            {isError ? (
              <span className="text-red-600">Ошибка!</span>
            ) : 'Успех!'}
          </ModalHeader>
          <ModalBody className="text-center pb-10">
            {
              isError ? 'Произошла ошибка при выполнении запроса' : (
                <span>
                  Блюдо успешно
                  {' '}
                  {isEdit ? 'отредактировано!' : 'создано!'}
                </span>
              )
            }
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
