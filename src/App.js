import React from 'react';
import { Route, Routes } from 'react-router';

import { Home, Login } from './pages';

const Test = () => <h1>Holaaa</h1>;
const App = () => {
  return (
    <Routes>
      <Route exact path="/login" Component={Login} />
      <Route exact path="/test" Component={Test} />
      <Route exact path="/home" Component={Home} />
    </Routes>
  );
};

export default App;
