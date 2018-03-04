import React from 'react';
import { connect } from 'react-redux';

class Login extends React.Component {
  state = {
    email: '',
    password: ''
  }

  handleLogin = this.handleLogin.bind(this)

  // make auth component
  componentWillMount() {
    if(this.props.authorized){
      this.props.history.push('/polls');
    }
  }

  onChange(text, source){
    this.setState({ [source]: text });
  }

  handleLogin(e){
    e.preventDefault();

    fetch("http://localhost:3001/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'same-origin',
            body: JSON.stringify(this.state)
        })
        .then(res => res.json())
        .then(({ token }) => {
          if(token){
            localStorage.setItem('accessToken', token);
            this.props.history.push('/polls');
          }
        });
  }

  render() {
    return (
      <div>
        <h1>
          Login
        </h1>
        <form>
        <input type='email'
          value={this.state.email}
          onChange={(text) => this.onChange(text.target.value, 'email')} />
        <input type='password'
          value={this.state.password}
          onChange={(text) => this.onChange(text.target.value, 'password')} />
        <button
          onClick={this.handleLogin}
        >
        Login</button>
        </form>

      </div>
    )
  }
}

const mapStateToProps = state => ({
  authorized: state.auth.authorized
})

export default connect(mapStateToProps)(Login);
