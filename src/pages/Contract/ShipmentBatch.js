import React, { useEffect, useState } from 'react';
import { Button, Form, Icon, Input, Page } from '../../components';
import { Controller, useFieldArray } from 'react-hook-form';
// import { containerTypesGroupSelect } from '../../lib/constants';
import { getContainerFormatted } from '../../lib/helpers';

const ShipmentBatch = ({
  containerList,
  transformedProducts,
  allowDelete,
  control,
  errors,
  setValue,
  watch,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'contract.shipmentBatch',
  });
  const [isVisible, setIsVisible] = useState(true);
  // Construimos los containers con su id como clave y quantity inicializada en null
  const createContainersWithIds = () => {
    return containerList.reduce(
      (acc, container) => ({
        ...acc,
        [container.id]: { quantity: 0 },
      }),
      {}
    );
  };

  // Inicializamos el state del formulario con un shipmentBatch y todos los containers
  useEffect(() => {
    // Solo inicializamos si aún no hay ningún shipmentBatch
    const currentBatches = watch('contract.shipmentBatch');
    console.log({ currentBatches });
    if (!currentBatches || currentBatches.length === 0) {
      const initialContainers = createContainersWithIds();
      setValue('contract.shipmentBatch', [{ containers: initialContainers }]);
    }
  }, [setValue, watch, containerList]);

  const addBatch = () => {
    // Crea los containers para el nuevo batch
    const newContainers = createContainersWithIds();
    // Agrega un nuevo batch con los containers al array existente
    append({ containers: newContainers });
  };

  const handleRemoveBatch = (index) => {
    // Elimina el batch en el índice dado
    if (allowDelete && fields.length > 1) {
      setIsVisible(false);
      setTimeout(() => {
        remove(index);
        setIsVisible(true);
      }, 500);
    }
  };

  console.log(watch('contract.shipmentBatch'));

  return (
    <>
      {fields.map(
        (
          batchItem,
          batchIndex // Usamos batchIndex para iterar sobre los shipmentBatch
        ) => (
          <Page.Section
            key={batchItem.id}
            cardStyle
            className={`my-5 relative ${!isVisible ? 'animate-fadeOut' : ''}`}
            title={`Tanda ${batchIndex + 1}`}
          >
            {fields.length > 1 && (
              <div className="absolute -top-5 -right-5 p-3">
                <div className="justify-center w-100">
                  <div className="flex justify-end items-center">
                    <a
                      onClick={() => handleRemoveBatch(batchIndex)}
                      className={`${allowDelete ? 'hover:cursor-pointer' : 'hover:cursor-not-allowed'}`}
                    >
                      <Icon size={35} name="error" color="error" />
                    </a>
                  </div>
                </div>
              </div>
            )}
            <Form.Row className="mt-2">
              <Form.Col>
                {containerList.map(
                  (
                    container,
                    containerIndex // Usamos containerIndex para iterar sobre los containers
                  ) => (
                    <>
                      <Form.Row key={container.id} className="justify-center">
                        <Form.Col>
                          <p>
                            {getContainerFormatted(
                              container,
                              transformedProducts
                            )}
                          </p>
                        </Form.Col>
                        <Form.Col>
                          <Controller
                            name={`contract.shipmentBatch[${batchIndex}].containers.${container.id}.quantity`} // Ajustamos el name para acceder correctamente a cada container
                            control={control}
                            rules={{ required: 'Este campo es requerido' }}
                            render={({ field }) => (
                              <Input
                                label="Cantidad"
                                type="number"
                                step={1}
                                min={1}
                                error={
                                  errors?.contract?.shipmentBatch?.containers?.[
                                    container.id
                                  ]?.batchs.message
                                }
                                {...field}
                              />
                            )}
                          />
                        </Form.Col>
                      </Form.Row>
                      {containerList?.length > 1 &&
                        containerIndex < containerList?.length - 1 && (
                          <hr className="border-top-2 border-gray-950 mt-4 mb-10" />
                        )}
                    </>
                  )
                )}
              </Form.Col>
            </Form.Row>
          </Page.Section>
        )
      )}
      <Button type="button" onClick={addBatch} className="mt-4">
        <Icon size={20} color="success" name="plusCircle" />
        <span className="pl-3">Agregar Envío</span>
      </Button>
    </>
  );
};

export default ShipmentBatch;
