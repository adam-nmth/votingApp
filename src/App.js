import React from 'react';
import { Provider, connect } from 'react-redux';
import { Route, BrowserRouter } from 'react-router-dom';

// actions
import { setAccessToken, fetchPersonalData } from './store/actions/auth';

import Layout from './Layout';

class App extends React.Component {
  state = {
    loading: true
  }

  componentWillMount() {
    this.loadAccessToken();
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.auth.accessToken !== nextProps.auth.accessToken) {
      this.props.dispatch(fetchPersonalData())
        .then((res) => {
          this.setState({ loading: false });
        })
        .catch(e => {
          console.log(e);
          this.setState({ loading: false });
        });
    }
  }

  loadAccessToken() {
    const accessToken = localStorage.getItem('accessToken');

    if(accessToken){
      this.props.dispatch(setAccessToken(accessToken))
    }else{
      this.setState({ loading: false });
    }
  }

  render() {
    if(this.state.loading){
      return <div>loading</div>
    }

    return (
      <Provider store={this.props.store}>
        <BrowserRouter key='router'>
          <Route component={Layout} />
        </BrowserRouter>
      </Provider>
    )
  }
}

export default connect(({ auth }) => ({ auth }))(App);
