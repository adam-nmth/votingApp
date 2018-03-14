import React from 'react';
import { connect } from 'react-redux';
import { setAccessToken } from '../../store/actions/auth';

// components
import Input from '../../Components/Input';
import Form from '../../Components/Form';

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
            this.props.dispatch(setAccessToken(token));
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
        <Form
          onSubmit={this.handleLogin}
        >
          <Input
            value={ this.state.email }
            label='Email'
            onChange={(text) => this.onChange(text.target.value, 'email')}
            type='email'
            placeholder='voting@app.com...'
          />
          <Input
            value={ this.state.password }
            label='Password'
            onChange={(text) => this.onChange(text.target.value, 'password')}
            type='password'
            placeholder='Password...'
          />
          <button
            type='submit'
          >
          Login</button>
        </Form>

      </div>
    )
  }
}

const mapStateToProps = state => ({
  authorized: state.auth.authorized
})

export default connect(mapStateToProps)(Login);
