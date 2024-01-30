import React from 'react';
import { Route, Routes } from 'react-router';

// import { withLDProvider } from 'launchdarkly-react-client-sdk';

// import { Passwordless } from 'src/flows';
import {
  // Cancel,
  Login,
  // Resume,
  //  MaintenanceMode,
} from './pages';
// import config from './config';
// import { InitialDisclaimer } from './pages';
// import { useFeatureFlags } from './lib/hooks';

// const ldConfig = {
//   clientSideID: config.launchDarkly.clientId,
//   user: {
//     key: 'anonymous',
//     custom: { clientType: 'fnol' },
//     anonymous: true,
//   },
// };

const Test = () => <h1>Holaaa</h1>;
const App = () => {
  // const { enableFnolMaintenanceMode } = useFeatureFlags();

  // if (enableFnolMaintenanceMode) {
  //   return <MaintenanceMode />;
  // }
  return (
    <Routes>
      <Route exact path="/login" Component={Login} />
      <Route exact path="/test" Component={Test} />
      {/* <Route exact path="/resume" component={Resume} />
      <Route exact path="/cancel" component={Cancel} />
      <Route path="/submit" component={Passwordless} />
      <Route path="/" component={InitialDisclaimer} /> */}
    </Routes>
  );
};

export default App;
