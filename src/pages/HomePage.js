import React from 'react';
import Button from '../components/Button';

const HomePage = () => {
  const handleClick = () => {
    alert('¡Botón clickeado!');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Página de Inicio</h1>
      <Button text="Hazme Clic" onClick={handleClick} />
    </div>
  );
};

export default HomePage;
