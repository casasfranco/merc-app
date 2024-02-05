import React from 'react';
import { Route, Routes } from 'react-router';

import { Home, Login, NewCompany, NewContract, Product } from './pages';

const App = () => {
  return (
    <Routes>
      <Route exact path="/login" Component={Login} />
      <Route exact path="/new-contract" Component={NewContract} />
      <Route exact path="/new-company" Component={NewCompany} />
      <Route exact path="/product" Component={Product} />
      <Route exact path="/home" Component={Home} />
      <Route path="/" Component={Home} />
    </Routes>
  );
};

export default App;
