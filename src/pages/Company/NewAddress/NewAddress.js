import React from 'react';

import { Input, Page, Form } from '../../../components';
import styles from './NewAddress.module.css';
import { validateStreetNumber } from '../../../lib/validations';

const NewAddress = ({ register, errors }) => {
  return (
    <Page.Section className={styles.card}>
      <h2>Nueva dirección</h2>
      <Form.Row>
        <Form.Col>
          <Input
            label="Calle"
            error={errors?.company?.address?.street?.message}
            {...register('company.address.street', {
              required: 'Required',
            })}
          />
        </Form.Col>
        <Form.Col>
          <Input
            label="Numero"
            type="number"
            step={1}
            min={0}
            error={errors?.company?.address?.number?.message}
            {...register('company.address.number', {
              required: 'Required',
              validate: (value) =>
                validateStreetNumber(value) ||
                'El numero de la calle debe ser entero',
            })}
          />
        </Form.Col>
      </Form.Row>
      <Form.Row>
        <Form.Col>
          <Input
            label="Piso"
            step={1}
            min={0}
            error={errors?.company?.address?.floor?.message}
            {...register('company.address.floor', {
              required: 'Required',
              validate: (value) =>
                validateStreetNumber(value) ||
                'El numero de la calle debe ser entero',
            })}
          />
        </Form.Col>
        <Form.Col>
          <Input
            label="Oficina"
            error={errors?.company?.address?.office?.message}
            {...register('company.address.office', {
              required: 'Required',
            })}
          />
        </Form.Col>
      </Form.Row>
      <Form.Row>
        <Form.Col>
          <Input
            label="Pais"
            error={errors?.company?.address?.country?.message}
            {...register('company.address.country', {
              required: 'Required',
            })}
          />
        </Form.Col>
        <Form.Col>
          <Input
            label="Estado"
            error={errors?.company?.address?.state?.message}
            {...register('company.address.state', {
              required: 'Required',
            })}
          />
        </Form.Col>
        <Form.Col>
          <Input
            label="Codigo Postal"
            error={errors?.company?.address?.postal_code?.message}
            {...register('company.address.postal_code', {
              required: 'Required',
            })}
          />
        </Form.Col>
      </Form.Row>
    </Page.Section>
  );
};

export default NewAddress;
