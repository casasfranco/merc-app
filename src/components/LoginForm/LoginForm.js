import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useForm, useModel } from '../../lib/hooks';
import { Button, Form, Input, Loading, Page } from '../../components';

import { validateEmail, validateNotEmpty } from '../../lib/validations';
import { useError } from '../../lib/hoc/ErrorContext';

const LoginForm = () => {
  const navigate = useNavigate();
  const { showError } = useError(); // Usa el hook useError
  const { login } = useModel.user.dispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
    setLoading(true);
    const result = await login(data);
    setLoading(false);

    if (result.error) {
      setError(result.error);
      showError(result.error); // Utiliza showError para mostrar el error
    } else {
      navigate('/home'); // Navega en caso de éxito
    }
  });

  if (loading) return <Loading />;
  if (error) console.log(error);
  return (
    <Page title="Iniciar Sesión">
      <Page.Section noCardStyle={true}>
        {formError && <div>{formError}</div>}
        <Form onSubmit={onSubmit}>
          <Form.Row>
            <Form.Col>
              <Input
                label="Email"
                {...register('user.email', {
                  required: 'Required',
                  validate: validateEmail,
                  message: 'Invalid email',
                })}
                error={errors?.user?.email?.message}
              />
            </Form.Col>
            <Form.Col>
              <Input
                label="Password"
                type="password"
                {...register('user.password', {
                  required: 'Required',
                  validate: validateNotEmpty,
                })}
                error={errors?.user?.password?.message}
              />
            </Form.Col>
          </Form.Row>
        </Form>
      </Page.Section>
      <Page.Buttons>
        <Button color="navy" onClick={onSubmit} loading={isSubmitting}>
          Next Step
        </Button>
      </Page.Buttons>
    </Page>
  );
};

export default LoginForm;
