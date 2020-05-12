import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import App from './App';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/(.*)" component={App} />
      <Redirect to="/" />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root'),
);
