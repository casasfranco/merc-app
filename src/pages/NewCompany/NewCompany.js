import React from 'react';
import {
  Button,
  Error,
  Form,
  Input,
  // Input,
  Page,
} from '../../components';
import { useForm } from '../../lib/hooks';

import NewAddress from './NewAddress';

const NewContract = () => {
  // const [createAddress, setCreateAddress] = useState(false);
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
        // setFormError(handleStartLoginError(err));
        setFormError(err);
      } else {
        await defaultOnError();
      }
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);

    setFormError(null);
    // const causeOfLossQuestions = causeOfLossQuestionsMapping[data?.causeOfLoss];

    // await nextPage(merge({}, pendingChanges, data));
  });

  // const newAddress = watch('newAddress');
  // useEffect(() => {
  //   if (newAddress === 'new') {
  //     setCreateAddress(true);
  //   } else {
  //     setCreateAddress(false);
  //   }
  // }, [newAddress]);

  return (
    <Page title="Formulario para solicitar un nuevo contrato">
      <Page.Section>
        {formError && <Error>{formError}</Error>}

        <Form onSubmit={onSubmit}>
          <Form.Row>
            <Form.Col>
              <Input
                label="Nombre"
                disabled={true}
                error={errors?.company?.name?.message}
                {...register('company.name', {
                  required: 'Required',
                })}
              />
            </Form.Col>
            <Form.Col>
              <Input
                label="Tax ID"
                error={errors?.company?.taxId?.message}
                {...register('company.taxId', {
                  required: 'Required',
                })}
              />
            </Form.Col>
          </Form.Row>
          <Form.Row>
            {/* <Form.Col>
              <Select
                label="Dirección"
                error={errors?.newAddress?.message}
                // options={
                //   enableLiabilityCols
                //     ? lossMapping?.types
                //     : lossMapping.types.filter((tol) => tol.id !== 'Liability')
                // }
                options={[
                  { id: 'new', title: 'Crear una nueva dirección' },
                  { id: 'asdas-2312-sad2-xad212', title: 'Manuel alberti 860' },
                ]}
                {...register('newAddress', { required: 'Required' })}
              />
            </Form.Col> */}
          </Form.Row>
          <NewAddress register={register} errors={errors} />
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

export default NewContract;
