import React, { useEffect, useState } from 'react';
import {
  Button,
  Error,
  Form,
  Input,
  Loading,
  Page,
  Select,
} from '../../components';
import { useForm, useModel } from '../../lib/hooks';
import { measureUnitsSelect } from '../../lib/constants';
import {
  checkProductExistence,
  handleProductAndPackingCreation,
} from '../../lib/services/product';
import { validateQuantityOfProductNumber } from '../../lib/validations';
import InfoModal from './InfoModal';

const Product = () => {
  const [fetchDataFlag, setFetchDataFlag] = useState(true);
  const [existingProduct, setExistingProduct] = useState(null);
  const { getAllPackings, getAllProducts } = useModel.product.dispatch();
  const {
    products,
    packings: { transformedPackings },
  } = useModel.product();

  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setFormError,
    formError,
    reset,
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

  useEffect(() => {
    async function fetchData() {
      await getAllPackings();
      await getAllProducts();
    }
    if (fetchDataFlag) fetchData();
    setFetchDataFlag(false);
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const { product } = data;

      setLoading(true);

      // Verifica si el producto ya existe
      const productExists = checkProductExistence(product, products);

      // TODO: Realizar estos dos metodos, cada uno va a ser una difurcación de la logica.
      //! Verifica si el packing existe
      // const packingExists = checkPackingExistence(packing, packings);
      //! Verifica si la relación ya existe
      // const relProdPackingExists = checkRelProdPackingExistence(packing,product);

      if (!!productExists) {
        setExistingProduct(productExists);
      } else {
        await handleProductAndPackingCreation(data);
        await getAllProducts();
        reset();
      }

      setFormError(null);
      setLoading(false);
    } catch (error) {
      setFormError(`${error}`);
      setLoading(false);
      setExistingProduct(null);
      reset();
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
                options={
                  transformedPackings
                    ? transformedPackings
                    : [{ id: 'new', title: 'Crear nuevo empaque' }]
                }
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
                    error={errors?.product?.packing?.unit?.message}
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
        {existingProduct && (
          <InfoModal
            // onAccept={() =>
            //   handleCreateRelationProductPacking({
            //     productId: existingProduct.id,
            //     packingId,
            //     quantity,
            //   })
            // }
            onCancel={() => setExistingProduct(null)}
          />
        )}
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
