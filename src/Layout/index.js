import React from 'react';
import { Route } from 'react-router-dom';
import routes from '../routes';

class Layout extends React.Component {
  render() {
    return (
      <div>
        {
          routes.map((route, i) => (
            <Route key={`route${i}`} {...route} />
          ))
        }
      </div>
    )
  }
}

export default Layout;
