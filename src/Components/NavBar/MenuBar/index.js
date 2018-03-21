import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';

import { resetAuth } from '../../../store/actions/auth';

import colors from '../../../utils/colors';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 39px;
`;

const MenuLink = styled(Link)`
  padding: 20px;
  font-size: 20px;
  color: ${colors.blue};

  &:hover{
    text-decoration: none;
    color: ${colors.beige};
  }
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
        title: 'Create Poll',
        to: '/create_poll'
      },
      {
        title: 'Polls',
        to: '/polls'
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
