import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="text-white hover:text-gray-300">
            Inicio
          </Link>
          <Link to="/products" className="text-white hover:text-gray-300">
            Producto List
          </Link>
        </li>
        {/* Agrega más elementos de navegación aquí */}
      </ul>
    </nav>
  );
};

export default Navbar;
