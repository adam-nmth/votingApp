import React from 'react';
import styled from 'styled-components';
import MenuBar from './MenuBar';

const Wrapper = styled.section`
  height: 150px;
  background-color: azure;
`;

const TitleWrapper = styled.div`
  height: 110px;
  display: flex;
  align-items: center;
  justify-content: center;  
`;

class NavBar extends React.Component {
  render() {
    return (
      <Wrapper>
        <TitleWrapper>
          <h1>Voting App</h1>
        </TitleWrapper>
        <MenuBar />
      </Wrapper>
    )
  }
}

export default NavBar;
