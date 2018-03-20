import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const Authorization = (WrappedComponent) => {
  class Auth extends React.Component {
    redirect() {
      this.props.history.push('/login');
      return null;
    }

    render() {
      return this.props.auth.authorized ? <WrappedComponent {...this.props} /> : this.redirect();
    }
  }

  return connect(({ auth }) => ({ auth }))(withRouter(Auth));
}

export default Authorization;
