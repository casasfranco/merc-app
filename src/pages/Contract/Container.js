import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import {
  Checkbox,
  Form,
  Icon,
  Input,
  Page,
  CustomSelect,
  SelectByGroup,
} from '../../components';
import { containerTypesGroupSelect } from '../../lib/constants';
import { validateHarvestNumber } from '../../lib/validations';

const Container = ({
  productList,
  allowDelete,
  removeContainer,
  index,
  control,
  errors,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const handleOnClick = () => {
    if (allowDelete) {
      setIsVisible(false);
      setTimeout(() => {
        removeContainer(index);
        setIsVisible(true);
      }, 500);
    }
  };
  const id = uuidv4();
  return (
    <Page.Section
      cardStyle
      className={`my-5 relative ${!isVisible ? 'animate-fadeOut' : ''}`}
    >
      <div className="absolute -top-5 -right-5 p-3">
        <div className="justify-center w-100">
          <div className="flex justify-end items-center">
            <a
              onClick={handleOnClick}
              className={`${allowDelete ? 'hover:cursor-pointer' : 'hover:cursor-not-allowed'}`}
            >
              <Icon size={35} name="error" color="error" />
            </a>
          </div>
        </div>
      </div>
      <Form.Row>
        <Form.Col>
          <Controller
            name={`contract.containers[${index}].id`}
            control={control}
            defaultValue={id}
            render={({ field }) => <input type="hidden" {...field} />}
          />
          <Controller
            name={`contract.containers[${index}].product`}
            control={control}
            rules={{ required: 'Este campo es requerido' }}
            render={({ field }) => (
              <CustomSelect
                label="Producto"
                {...field}
                options={productList}
                error={errors?.contract?.containers?.[index]?.product?.message}
              />
            )}
          />
        </Form.Col>
        <Form.Col>
          <Controller
            name={`contract.containers[${index}].harvest`}
            control={control}
            rules={{
              required: 'Este campo es requerido',
              validate: (value) =>
                validateHarvestNumber(value) ||
                'El año de cosecha debe ser entero',
            }}
            render={({ field }) => (
              <Input
                label="Cosecha"
                type="number"
                step={1}
                min={2000}
                error={errors?.contract?.containers?.[index]?.harvest?.message}
                {...field}
              />
            )}
          />
        </Form.Col>
      </Form.Row>
      <Form.Row>
        <Form.Col>
          <Controller
            name={`contract.containers[${index}].containerType`}
            control={control}
            rules={{ required: 'Este campo es requerido' }}
            render={({ field }) => (
              <SelectByGroup
                label="Tipo de contenedor"
                {...field}
                options={containerTypesGroupSelect}
                error={
                  errors?.contract?.containers?.[index]?.containerType?.message
                }
              />
            )}
          />
        </Form.Col>
        <Form.Col className={'justify-center'}>
          <Controller
            name={`contract.containers[${index}].fcl`}
            control={control}
            render={({ field }) => (
              <Checkbox
                optional
                label="FCL"
                {...field}
                error={errors?.contract?.containers?.[index].fcl?.message}
              />
            )}
          />
        </Form.Col>
      </Form.Row>
    </Page.Section>
  );
};

export default Container;
