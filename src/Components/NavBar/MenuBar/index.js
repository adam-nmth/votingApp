import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';

import { resetAuth } from '../../../store/actions/auth';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid black;
  height: 39px;
`;

const MenuLink = styled(Link)`
  border: 1px solid black;
  padding: 6px;
    border-top: 0;
    border-bottom: 0;
`;

class MenuBar extends React.Component {
  constructor(props) {
    super(props);

    this.onLogOut = this.onLogOut.bind(this);

    this.authorizedLinks = [
      {
        title: '<',
        onClick: () => props.history.goBack(),
        to: '#'
      },
      {
        title: 'Polls',
        to: '/polls'
      },
      {
        title: 'Create Poll',
        to: '/create_poll'
      },
      {
        title: 'Log Out',
        to: '#',
        onClick: this.onLogOut
      }
    ];

    this.unAuthorizedLinks = [
      {
        title: 'Register',
        to: '/register'
      },
      {
        title: 'Login',
        to: '/login'
      }
    ];
  }

  onLogOut() {
    this.props.dispatch(resetAuth());
    this.props.history.push('/login');
  }

  render() {
    const links = this.props.auth.authorized ? this.authorizedLinks : this.unAuthorizedLinks;
    console.log(links);
    return (
      <Wrapper>
        {links.map((item, i) => (
          <MenuLink {...item}>
            {item.title}
          </MenuLink>
          )
        )}
      </Wrapper>
    )
  }
}

export default connect(({ auth }) => ({ auth }))(withRouter(MenuBar));
