import React from 'react';
import Dashboard from './containers/Dashboard/Dashboard';
import Alert from './components/Alert/Alert';

import './sass/app.scss';

// Componenets

// Redux
import { Provider } from 'react-redux';
import store from './redux';

const App = () => (
  <Provider store={store}>
    <div className="container">
      <Alert />
      <Dashboard />
    </div>
  </Provider>
)

export default App;
