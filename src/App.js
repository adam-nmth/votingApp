import React from 'react';
import { Provider, connect } from 'react-redux';
import { Route, BrowserRouter } from 'react-router-dom';

// actions
import { setAccessToken, setPersonalData } from './store/actions/auth';

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
      fetch('http://localhost:3001/api/personal', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': nextProps.auth.accessToken // make this from reducer
        },
        credentials: 'same-origin',
      })
        .then(res => res.json())
        .then((res) => {
          console.log(res)
          if(res.status == 'ok'){
            this.props.dispatch(setPersonalData(res.data));
          }

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
