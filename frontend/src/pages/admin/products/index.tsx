import { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import {
  Button, Image, Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader, Select, SelectItem, Textarea,
  useDisclosure
} from '@nextui-org/react';

import {
  defaultProduct, useAddProductMutation, useGetProductsQuery
} from '@entities/product';

import { ProductWithoutID, WeightType } from '@shared/types';

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

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [productPreview, setProductPreview] = useState<string>('');

  const handleCloseProductModal = () => {
    onClose();
    clearErrors();
    Object
      .entries(defaultProduct)
      .map(([key, value]) => setValue(key as keyof ProductWithoutID, value));
  };

  const handleAlertClose = () => {
    alertOnClose();
    handleCloseProductModal();
  };

  const handleAddNewProduct = (form: ProductWithoutID) => {
    const formattedData = { ...form };

    formattedData.name = form.name.trim();
    formattedData.description = form.description.trim();
    formattedData.price = Number(form.price);
    formattedData.weight = Number(form.weight);
    formattedData.weightType = Number(form.weightType);
    formattedData.inStopList = Boolean(form.inStopList);

    setIsEdit(false);
    addProduct(formattedData)
      .unwrap()
      .then(() => setIsError(false))
      .catch(() => setIsError(true))
      .finally(() => {
        alertOnOpen();
      });
  };

  return (
    <>
      <Button
        color="primary"
        onPress={onOpen}
      >
        Создать блюдо
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={handleCloseProductModal}
        onOpenChange={onOpenChange}
        size="3xl"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Создание блюда</ModalHeader>
          <ModalBody>
            <form
              className="flex flex-col gap-4"
              id="add-new-product"
              onSubmit={handleSubmit(handleAddNewProduct)}
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
                          selectedKeys={[value]}
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
              Добавить
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
