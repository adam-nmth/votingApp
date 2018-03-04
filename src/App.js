import React from 'react';
import { Provider } from 'react-redux';
import { Route, BrowserRouter } from 'react-router-dom';

import Layout from './Layout';

export default (props) =>
  <Provider store={props.store}>
    <BrowserRouter key='router'>
      <Route component={Layout} />
    </BrowserRouter>
  </Provider>
