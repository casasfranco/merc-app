import React from 'react';
import { Route, Routes } from 'react-router';

import { Home, Login, Company, Contract, Product } from './pages';

const App = () => {
  return (
    <Routes>
      <Route exact path="/login" Component={Login} />
      <Route exact path="/new-contract" Component={Contract} />
      <Route exact path="/new-company" Component={Company} />
      <Route exact path="/product" Component={Product} />
      <Route exact path="/home" Component={Home} />
      <Route path="/" Component={Home} />
    </Routes>
  );
};

export default App;
