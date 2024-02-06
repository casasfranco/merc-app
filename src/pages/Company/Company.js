import React from 'react';
import { Button, Error, Form, Input, Page } from '../../components';
import { useForm } from '../../lib/hooks';

import NewAddress from './NewAddress';

const Company = () => {
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

export default Company;
