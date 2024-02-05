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
import {
  createPacking,
  createProduct,
  createRelationProductPacking,
} from '../../lib/services/product';
import { validateQuantityOfProductNumber } from '../../lib/validations';

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
    try {
      setLoading(true);
      const { product, packingId: withPackingId, packing, quantity } = data;

      let packingId = null;

      // Creo producto
      const { createProduct: productResponse } = await createProduct(product);

      if (withPackingId != 'new') packingId = withPackingId;

      if (packing && withPackingId === 'new') {
        const { createPacking: packingResponse } = await createPacking(packing);
        packingId = packingResponse.id;
      }

      await createRelationProductPacking({
        productId: productResponse.id,
        packingId,
        quantity: parseFloat(quantity),
      });

      setFormError(null);
      setLoading(false);
    } catch (error) {
      setFormError(`${error}`);
      setLoading(false);
    }
  });

  const isNewPackingSelected = watch('packingId') === 'new';

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
                error={errors?.packingId?.message}
                // options={
                //   enableLiabilityCols
                //     ? lossMapping?.types
                //     : lossMapping.types.filter((tol) => tol.id !== 'Liability')
                // }
                options={[
                  { id: 'new', title: 'Crear nuevo empaque' },
                  { id: 'asdas-2312-sad2-xad212', title: 'Bolsa 25 Kg' },
                ]}
                {...register('packingId', { required: 'Required' })}
              />
            </Form.Col>
            <Form.Col>
              <Input
                label="Cantidad por paquete"
                type="number"
                step={1}
                min={0}
                error={errors?.quantity?.message}
                {...register('quantity', {
                  required: 'Required',
                  validate: (value) =>
                    validateQuantityOfProductNumber(value) ||
                    'El peso del producto empaquetado debe ser entero',
                })}
              />
            </Form.Col>
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
                    {...register('packing.description', {
                      required: 'Required',
                    })}
                  />
                </Form.Col>
                <Form.Col>
                  <Select
                    label="Unidad"
                    error={errors?.product?.packing?.unit.message}
                    options={measureUnitsSelect}
                    {...register('packing.unit', {
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
