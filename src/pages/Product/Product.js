import React, { useState } from 'react';
import {
  Button,
  Error,
  Form,
  Input,
  Loading,
  Page,
  Select,
} from '../../components';
import { useForm } from '../../lib/hooks';
import { measureUnitsSelect } from '../../lib/constants';
import { createProduct } from '../../lib/services/product';

const Product = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setFormError,
    formError,
  } = useForm({
    mode: 'onChange',
    onError: async ({ err, setFormError, defaultOnError }) => {
      if (err.statusCode) {
        setFormError(err);
      } else {
        await defaultOnError();
      }
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    try {
      setLoading(true);
      const { product } = data;
      if (isNewPackingSelected) delete product.packingId;
      const response = await createProduct(product);
      console.log({ response });
      setFormError(null);
    } catch (error) {
      setFormError(`${error}`);
      setLoading(false);
    }
  });

  const isNewPackingSelected = watch('product.packingId') === 'new';

  if (loading) return <Loading />;

  return (
    <Page title="Nuevo Producto">
      <Page.Section>
        {formError && <Error>{formError}</Error>}

        <Form onSubmit={onSubmit}>
          <Form.Row>
            <Form.Col>
              <Input
                label="Codigo HS"
                error={errors?.product?.codeHS?.message}
                {...register('product.codeHS', {
                  required: 'Required',
                })}
              />
            </Form.Col>
            <Form.Col>
              <Input
                label="Descripción"
                error={errors?.product?.description?.message}
                {...register('product.description', {
                  required: 'Required',
                })}
              />
            </Form.Col>
          </Form.Row>
          <Form.Row>
            <Form.Col>
              <Select
                label="Empaque"
                error={errors?.product?.packingId?.message}
                // options={
                //   enableLiabilityCols
                //     ? lossMapping?.types
                //     : lossMapping.types.filter((tol) => tol.id !== 'Liability')
                // }
                options={[
                  { id: 'new', title: 'Crear nuevo empaque' },
                  { id: 'asdas-2312-sad2-xad212', title: 'Bolsa 25 Kg' },
                ]}
                {...register('product.packingId', { required: 'Required' })}
              />
            </Form.Col>
            <Form.Col> </Form.Col>
          </Form.Row>
          {isNewPackingSelected && (
            <>
              <Page.Section className={'mt-5'}>
                <h2>Nuevo Empaque</h2>
              </Page.Section>
              <Form.Row>
                <Form.Col>
                  <Input
                    label="Descripción"
                    error={errors?.product?.packing?.description?.message}
                    {...register('product.packing.description', {
                      required: 'Required',
                    })}
                  />
                </Form.Col>
                <Form.Col>
                  <Select
                    label="Unidad"
                    error={errors?.product?.packing?.unit.message}
                    options={measureUnitsSelect}
                    {...register('product.packing.unit', {
                      required: 'Required',
                    })}
                  />
                </Form.Col>
              </Form.Row>
            </>
          )}
        </Form>
      </Page.Section>
      <Page.Buttons>
        <Button
          type="submit"
          color="navy"
          onClick={onSubmit}
          loading={isSubmitting}
        >
          Guardar
        </Button>
      </Page.Buttons>
    </Page>
  );
};

export default Product;
