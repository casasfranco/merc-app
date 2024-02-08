import React, { useEffect, useState } from 'react';
import Icon from '../Icon';

const Notification = ({ message, showError }) => {
  const [isVisible, setIsVisible] = useState(false); // Cambiado a false inicialmente

  useEffect(() => {
    // Retraso para iniciar la animación de aparición
    const appearTimeout = setTimeout(() => {
      setIsVisible(true);
    }, 10); // Un retraso corto asegura que la clase se aplique después de montar el componente

    // Timer para iniciar la desaparición después de 8 segundos
    const disappearTimer = setTimeout(() => {
      setIsVisible(false);
    }, 8000);

    return () => {
      clearTimeout(appearTimeout);
      clearTimeout(disappearTimer);
    };
  }, []);

  useEffect(() => {
    if (!isVisible) {
      // Retraso para permitir que la animación de desaparición se complete
      const closeTimeout = setTimeout(() => {
        showError(false);
      }, 2000); // Asegúrate de que este tiempo coincida con la duración de tu animación de salida
      return () => clearTimeout(closeTimeout);
    }
  }, [isVisible, showError]);

  const handleCloseAlert = () => {
    setIsVisible(false);
  };

  return (
    <div
      className={`fixed bottom-5 right-5 bg-red-400 text-white p-3 rounded-lg shadow-md transition-all duration-1000 ease-in-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
      style={{
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'transform 500ms ease-in-out, opacity 500ms ease-in-out',
      }}
    >
      <span className="mr-7">{message}</span>
      <button
        onClick={handleCloseAlert}
        className="absolute top-1.5 right-0 mt-2 mr-2 text-white bg-transparent text-sm p-1.5"
      >
        <Icon name="times" size={9} color="white" />
      </button>
    </div>
  );
};

export default Notification;
