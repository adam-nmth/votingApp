import React from 'react';
import { connect } from 'react-redux';
import { setAccessToken } from '../../store/actions/auth';

// components
import Input from '../../Components/Input';
import Form from '../../Components/Form';

class Register extends React.Component {
  handleSubmit = this.handleSubmit.bind(this);

  state = {
    email: '',
    passwordOne: '',
    passwordTwo: '',
  };

  onChange(source, value) {
    this.setState({
      [source]: value,
    });
  }

  validateForm() {
    return (
      this.state.email.length &&
      this.state.passwordOne.length &&
      this.state.passwordTwo.length
    );
  }

  handleSubmit(e) {
    if (!this.validateForm()) {
      return
    }

    if(this.state.passwordOne !== this.state.passwordTwo){
      e.preventDefault();
      return
    }

    e.preventDefault();

    const body = {
      email: this.state.email,
      password: this.state.passwordOne,
    };

    fetch('http://localhost:3001/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify(body),
    })
      .then(res => res.json())
      .then(({ token }) => {
        if (token) {
          localStorage.setItem('accessToken', token);
          this.props.dispatch(setAccessToken(token));
          this.props.history.push('/polls');
        }
      });
  }

  render() {
    return (
      <div>
        <h1>Register</h1>
        <Form onSubmit={this.handleSubmit}>
          <Input
            type="email"
            value={this.state.email}
            label='Email'
            placeholder='voting@app.com...'
            required
            onChange={text => this.onChange('email', text.target.value)}
          />
          <Input
            type="password"
            value={this.state.passwordOne}
            label='Password'
            placeholder='Password...'
            required
            onChange={text => this.onChange('passwordOne', text.target.value)}
          />
          <Input
            type="password"
            value={this.state.passwordTwo}
            label='Password again'
            placeholder='Password again...'
            required
            onChange={text => this.onChange('passwordTwo', text.target.value)}
          />
          <button type="submit">register</button>
        </Form>
      </div>
    );
  }
}

export default connect()(Register);
