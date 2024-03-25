import React, { useEffect, useState } from 'react';

import {
  Button,
  Checkbox,
  DateInput,
  Error,
  Form,
  Icon,
  Input,
  Page,
  CustomSelect,
  TextArea,
  Loading,
} from '../../components';
import { useForm, useModel } from '../../lib/hooks';
import {
  validateQuantityOfProductNumber,
  validateStreetNumber,
} from '../../lib/validations';
import { INCOTERMS, incotermsSelect } from '../../lib/constants';
import Container from './Container';
import { useError } from '../../lib/hoc/ErrorContext';
import ShipmentBatch from './ShipmentBatch';

const Contract = () => {
  const { showError } = useError();
  const { getAllPackings, getAllProducts } = useModel.product.dispatch();
  const { getAllCompanies } = useModel.company.dispatch();
  const { create } = useModel.contract.dispatch();
  const {
    products: { transformedProducts },
    packings: { transformedPackings },
  } = useModel.product();
  const {
    companies: { transformedCompanies },
  } = useModel.company();

  const form = useForm({
    mode: 'onChange',
    defaultValues: {
      contract: {
        date: null,
        companySeller: '',
        companyBuyer: '',
        quantity: '',
        price: '',
        payment: '',
        freeDaysPOD: '',
        incoterm: '',
        mercTaxId: false,
        notes: '',
        containers: [],
      },
    },
    onError: async ({ err, setFormError, defaultOnError }) => {
      if (err.statusCode) {
        setFormError(err);
      } else {
        await defaultOnError();
      }
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    control,
    setValue,
    setFormError,
    formError,
    reset,
  } = form;

  const [fetchDataFlag, setFetchDataFlag] = useState(true);
  const [allowDelete, setAllowDelete] = useState(false);
  const [step, setStep] = useState(1);
  const [containers, setConteiners] = useState([{}]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (!transformedCompanies) {
        const companyError = await getAllCompanies();
        showError(companyError?.error);
      }

      if (!transformedPackings) {
        const packingError = await getAllPackings();
        showError(packingError?.error);
      }

      if (!transformedProducts) {
        const productError = await getAllProducts();
        showError(productError?.error);
      }
    }
    if (fetchDataFlag) fetchData();
    setFetchDataFlag(false);
  }, []);

  const addContainer = () => {
    const currentContainers = containers || [];
    const newContainer = {};
    const newContainers = [...currentContainers, newContainer];
    setConteiners(newContainers);
    if (newContainers.length > 1) {
      setAllowDelete(true);
    }
  };

  const removeContainer = (index) => {
    const newConteiners = containers.filter((_, i) => i !== index);
    setConteiners(newConteiners);
    if (newConteiners?.length === 1) setAllowDelete(false);
  };

  const incotermSelected = watch('contract.incoterm');
  const containersLoaded = watch('contract.containers');

  const isRequiredFreeDaysPOD =
    incotermSelected === INCOTERMS.CFR || incotermSelected === INCOTERMS.CIF;

  const pageTitle =
    step === 1
      ? 'Formulario para solicitar un nuevo contrato'
      : 'Administrar tandas de envíos';

  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log(data);
      setLoading(true);
      await create(data);
      setFormError(null);
      setLoading(false);
    } catch (error) {
      setFormError(`${error}`);
      setLoading(false);
      reset();
    }
  });

  const goToNextStep = () => {
    // Simula un evento de envío del formulario para activar la validación
    handleSubmit(
      (data) => {
        console.log(data); // Los datos son válidos, se puede proceder al siguiente paso
        setStep((currentStep) => currentStep + 1);
      },
      (errors) => {
        console.log(errors); // Hay errores, permanece en el paso actual y muestra errores
      }
    )();
  };

  const goToPreviusStep = () => {
    setStep((currentStep) => currentStep - 1);
  };

  if (loading) return <Loading />;

  return (
    <Page title={pageTitle}>
      <Page.Section>
        {formError && <Error>{formError}</Error>}

        <Form onSubmit={onSubmit}>
          {step === 1 ? (
            <>
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
                </Form.Col>
                <Form.Col>
                  <CustomSelect
                    label="Proveedor"
                    error={errors?.contract?.companySeller?.message}
                    options={transformedCompanies}
                    {...register('contract.companySeller', {
                      required: 'Required',
                    })}
                  />
                </Form.Col>
              </Form.Row>
              <Form.Row>
                <Form.Col>
                  <CustomSelect
                    label="Emitir contrato para"
                    error={errors?.contract?.companyBuyer?.message}
                    options={transformedCompanies}
                    {...register('contract.companyBuyer', {
                      required: 'Required',
                    })}
                  />
                </Form.Col>
                <Form.Col>
                  <Input
                    label="Cantidad Total (tons)"
                    error={errors?.contract?.quantity?.message}
                    {...register('contract.quantity', {
                      required: 'Required',
                    })}
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
                    error={errors?.contract?.price?.message}
                    {...register('contract.price', {
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
              <Form.Row className="mb-2 md:mb-4 ">
                <Form.Col>
                  <Input
                    label="Dias Libres POD"
                    error={errors?.contract?.freeDaysPOD?.message}
                    optional={!isRequiredFreeDaysPOD || false}
                    {...register('contract.freeDaysPOD', {
                      required: isRequiredFreeDaysPOD ? 'Required' : null,
                      validate: (value) =>
                        validateStreetNumber(value) ||
                        'La cantidad de días deben ser mayor a 0',
                    })}
                  />
                  <CustomSelect
                    label="INCOTERM"
                    error={errors?.contract?.incoterm?.message}
                    options={incotermsSelect}
                    {...register('contract.incoterm', {
                      required: 'Required',
                    })}
                  />
                  <Checkbox
                    label="Incluir TAX ID Merc"
                    containerClassName="my-4"
                    {...register('contract.mercTaxId')}
                    error={errors?.contract?.mercTaxId?.message}
                  />
                </Form.Col>
                <Form.Col>
                  <TextArea
                    label="Notas"
                    maxLength={100}
                    minRows={5}
                    {...register('contract.notes')}
                    error={errors?.contract?.notes?.message}
                  />
                </Form.Col>
              </Form.Row>
              {containers?.length > 0 &&
                containers.map((container, index) => (
                  <Form.Row key={index}>
                    <Container
                      productList={transformedProducts}
                      allowDelete={allowDelete}
                      container={container}
                      index={index}
                      removeContainer={removeContainer}
                      control={control}
                      errors={errors}
                    />
                  </Form.Row>
                ))}
              <Button type="button" onClick={addContainer} className="mt-4">
                <Icon size={20} color="success" name="plusCircle" />
                <span className="pl-3">Agregar Contenedor</span>
              </Button>
            </>
          ) : (
            <ShipmentBatch
              containerList={containersLoaded}
              transformedProducts={transformedProducts}
              allowDelete={allowDelete}
              removeContainer={removeContainer}
              control={control}
              errors={errors}
              setValue={setValue}
              watch={watch}
            />
          )}
        </Form>
      </Page.Section>
      <Page.Buttons>
        {step === 1 && (
          <Button type="button" color="navy" onClick={goToNextStep}>
            Siguiente
          </Button>
        )}
        {step === 2 && (
          <>
            <Button
              type="button"
              color="navy"
              onClick={goToPreviusStep}
              loading={isSubmitting}
            >
              Anterior
            </Button>
            <Button
              type="submit"
              color="navy"
              onClick={onSubmit}
              loading={isSubmitting}
            >
              Guardar
            </Button>
          </>
        )}
      </Page.Buttons>
    </Page>
  );
};

export default Contract;
