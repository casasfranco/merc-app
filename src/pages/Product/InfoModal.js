import React from 'react';
import { Icon } from '../../components';

const InfoModal = ({ onCancel, onAccept }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-50 flex justify-center items-center">
      <div className="bg-white px-6 py-5 rounded-lg shadow-xl max-w-sm w-full">
        <div className="flex justify-center mb-4">
          <Icon name="question" size="50" color="warning" />
        </div>
        <p className="text-center text-gray-700 mb-4">
          Ops! El producto que intentas crear ya existe. ¿Quieres crear una
          nueva relación entre producto y empaque?
        </p>
        <div className="flex justify-evenly">
          <button
            className="px-4 py-2 rounded bg-gray-200 text-gray-800 hover:bg-gray-300 transition duration-150"
            onClick={onCancel}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition duration-150"
            onClick={onAccept}
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
