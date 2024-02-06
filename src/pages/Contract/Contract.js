import React from 'react';
import {
  Button,
  Checkbox,
  DateInput,
  Error,
  Form,
  Input,
  Page,
  Select,
  TextArea,
} from '../../components';
import { useForm } from '../../lib/hooks';
import {
  validateHarvestNumber,
  validateQuantityOfProductNumber,
} from '../../lib/validations';
// import styles from './Contract.module.css';

const Contract = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    // watch,
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
    setFormError(null);
  });

  return (
    <Page title="Formulario para solicitar un nuevo contrato">
      <Page.Section>
        {formError && <Error>{formError}</Error>}

        <Form onSubmit={onSubmit}>
          <Form.Row>
            <Form.Col>
              <DateInput
                label="Fecha"
                error={errors?.contract?.date?.message}
                {...register('contract.date', {
                  required: 'Required',
                  valueAsDate: true,
                })}
              />
              {/* <Input
                label="Nombre"
                error={errors?.company?.name?.message}
                {...register('company.name', {
                  required: 'Required',
                })}
              /> */}
            </Form.Col>
            <Form.Col>
              <Select
                label="Proveedor"
                error={errors?.contract?.companySeller?.message}
                options={[
                  { id: 'proveedorSeleer', title: 'Seleccione una opcion' },
                ]}
                {...register('contract.companySeller', {
                  required: 'Required',
                })}
              />
            </Form.Col>
          </Form.Row>
          <Form.Row>
            <Form.Col>
              <Select
                label="Emitir contrato para"
                error={errors?.contract?.companyBuyer?.message}
                options={[
                  { id: 'companyBuyer', title: 'Seleccione una opcion' },
                ]}
                {...register('contract.companyBuyer', {
                  required: 'Required',
                })}
              />
            </Form.Col>
            <Form.Col>
              <Select
                label="Producto"
                error={errors?.contract?.product?.message}
                options={[{ id: 'product', title: 'Seleccione una opcion' }]}
                {...register('contract.product', {
                  required: 'Required',
                })}
              />
            </Form.Col>
          </Form.Row>
          <Form.Row>
            <Form.Col>
              <Input
                label="Cosecha"
                type="number"
                step={1}
                min={2000}
                error={errors?.company?.harvest?.message}
                {...register('company.harvest', {
                  required: 'Required',
                  validate: (value) =>
                    validateHarvestNumber(value) ||
                    'El año de cosecha debe ser entero',
                })}
              />
            </Form.Col>
            <Form.Col className={'justify-center'}>
              <Checkbox
                label="FCL"
                // checked={}
                {...register('contract.fcl')}
                error={errors?.contract?.fcl?.message}
              />
            </Form.Col>
          </Form.Row>
          <Form.Row>
            <Form.Col>
              <Input
                label="Precio"
                type="number"
                step={1}
                min={0}
                error={errors?.contract?.quantity?.message}
                {...register('contract.quantity', {
                  required: 'Required',
                  validate: (value) =>
                    validateQuantityOfProductNumber(value) ||
                    'El precio debe ser mayor a 0',
                })}
              />
            </Form.Col>
            <Form.Col>
              <Input
                label="Pago"
                error={errors?.contract?.payment?.message}
                {...register('contract.payment', {
                  required: 'Required',
                })}
              />
            </Form.Col>
          </Form.Row>
          <Form.Row>
            <Form.Col>
              <Input
                label="ETD"
                error={errors?.contract?.etd?.message}
                {...register('contract.etd', {
                  required: 'Required',
                })}
              />
            </Form.Col>
            <Form.Col>
              <Input
                label="ETA"
                error={errors?.contract?.eta?.message}
                {...register('contract.eta', {
                  required: 'Required',
                })}
              />
            </Form.Col>
          </Form.Row>
          <Form.Row>
            <Form.Col>
              <Input
                label="Dias Libres POD"
                error={errors?.contract?.freeDaysPOD?.message}
                {...register('contract.freeDaysPOD', {
                  required: 'Required',
                })}
              />
              <Checkbox
                label="Incluir TAX ID Merc"
                // checked={}
                {...register('contract.mercTaxId')}
                error={errors?.contract?.mercTaxId?.message}
              />
            </Form.Col>
            <Form.Col>
              <TextArea
                label="Notas"
                maxLength={50}
                minRows={5}
                {...register('contract.notes', {
                  required: 'Required',
                })}
                error={errors?.contract?.notes?.message}
              />
            </Form.Col>
          </Form.Row>
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

export default Contract;
