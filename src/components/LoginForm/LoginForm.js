import React from 'react';

import { useForm } from '../../lib/hooks';
import { Button, Form, Input, Page } from '../../components';

import { validateEmail, validateNotEmpty } from '../../lib/validations';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formError,
    formState: { errors, isSubmitting },
  } = useForm({
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
    // await startLogin(data.loss.reportedBy.email);
    // data.loss.reportedBy.participantRole = 'Unknown';

    // stageChanges(data);
    // await nextPage(null, { skipUpdate: true });
  });

  return (
    <Page title="Iniciar Sesión">
      <Page.Section noCardStyle={true}>
        {formError && <div>{formError}</div>}
        <Form onSubmit={onSubmit}>
          <Form.Row>
            <Form.Col>
              <Input
                label="First Name"
                {...register('loss.reportedBy.firstName', {
                  required: 'Required',
                  validate: validateNotEmpty,
                })}
                error={errors?.loss?.reportedBy?.firstName?.message}
              />
            </Form.Col>
            <Form.Col>
              <Input
                label="Email"
                {...register('loss.reportedBy.email', {
                  required: 'Required',
                  validate: validateEmail,
                  message: 'Invalid email',
                })}
                error={errors?.loss?.reportedBy?.email?.message}
              />
            </Form.Col>
          </Form.Row>
        </Form>
      </Page.Section>
      <Page.Buttons>
        <Button
          color="navy"
          onClick={() => console.log('Enviando')}
          loading={isSubmitting}
        >
          Next Step
        </Button>
      </Page.Buttons>
    </Page>
  );
};

export default LoginForm;
