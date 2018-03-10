import React from 'react';
import { Route } from 'react-router-dom';
import routes from '../routes';

// components
import NavBar from '../Components/NavBar';

class Layout extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
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
