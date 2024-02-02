import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../../components';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className={`p-4  ${isOpen ? 'bg-green-50' : ''} md:bg-white rounded-lg`}
    >
      <div className="container mx-auto flex flex-col md:flex-row justify-between">
        {isOpen ? (
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
            <Icon name="times" size="27" />
          </button>
        ) : (
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
            <Icon name="menu" size="27" />
          </button>
        )}

        <div
          className={`${isOpen ? 'block' : 'hidden'} md:block flex flex-col md:flex-row pt-4 md:pt-0`}
        >
          <Link
            to="/home"
            className=" px-4 py-2 hover:bg-gray-700 hover:text-white hover:rounded-lg"
          >
            Home
          </Link>
          <Link
            to="/new-contract"
            className=" px-4 py-2 hover:bg-gray-700 hover:text-white hover:rounded-lg"
          >
            Crear contrato(+)
          </Link>
          <Link
            to="/new-company"
            className=" px-4 py-2 hover:bg-gray-700 hover:text-white hover:rounded-lg"
          >
            Crear compañia(+)
          </Link>
          <Link
            to="/product"
            className=" px-4 py-2 hover:bg-gray-700 hover:text-white hover:rounded-lg"
          >
            Producto(+)
          </Link>
          <Link
            to="/ruta1"
            className=" px-4 py-2 hover:bg-gray-700 hover:text-white hover:rounded-lg"
          >
            Ruta 1
          </Link>
          <Link
            to="/ruta1"
            className=" px-4 py-2 hover:bg-gray-700 hover:text-white hover:rounded-lg"
          >
            Ruta 1
          </Link>
          {/* Más enlaces */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
