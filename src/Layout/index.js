import React from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';
import routes from '../routes';

// components
import NavBar from '../Components/NavBar';
import colors from '../utils/colors';

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 500px;
`;

const ViewWrapper = styled.section`
  max-width: 500px;
  min-width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${colors.lightGreen};
  padding: 50px;
  border-radius: 3px;  
`;

class Layout extends React.Component {
  render() {
    return (
      <LayoutWrapper>
        <NavBar />
        <ViewWrapper>
          {
            routes.map((route, i) => (
              <Route key={`route${i}`} {...route} />
            ))
          }
        </ViewWrapper>
      </LayoutWrapper>
    )
  }
}

export default Layout;
