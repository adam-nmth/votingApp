import React from 'react';
import { Route } from 'react-router-dom';
import routes from '../routes';

class Layout extends React.Component {
  componentDidMount() {
    const token = localStorage.getItem('accessToken');
    if(token) {
      fetch('http://localhost:3001/api/personal', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token // make this from reducer
        },
        credentials: 'same-origin',
      })
        .then(res => res.json())
        .then((res) => {
          console.log(res)
        });
    }
  }

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
