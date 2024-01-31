import React from 'react';
import Button from '../../components/Button';
import { Page } from '../../components';

const Home = () => {
  const handleClick = () => {
    alert('¡Botón clickeado!');
  };

  return (
    <Page>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Página de Inicio</h1>
        <Button text="Hazme Clic" onClick={handleClick} />
      </div>
    </Page>
  );
};

export default Home;
