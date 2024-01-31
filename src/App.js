import React from 'react';
import { Route, Routes } from 'react-router';

import { Home, Login, NewContract } from './pages';

const App = () => {
  return (
    <Routes>
      <Route exact path="/login" Component={Login} />
      <Route exact path="/new-contract" Component={NewContract} />
      <Route exact path="/home" Component={Home} />
    </Routes>
  );
};

export default App;
