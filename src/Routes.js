import React from 'react';
import { Router, Scene } from 'react-native-router-flux';

import Dashboard from './components/dashboard';
import UserCreate from './components/create';
import UserShow from './components/show';

const Routes = () => (
	<Router>
    <Scene key='root'>
      <Scene key='dashboard' hideNavBar component={Dashboard} title="Dashboard" />
      <Scene key='usercreate' hideNavBar component={UserCreate} title="UserCreate" />
      <Scene key='usershow' hideNavBar component={UserShow} title="UserShow" />
    </Scene>
  </Router>
);

export default Routes;