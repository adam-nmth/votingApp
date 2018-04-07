import React from 'react';
import { connect } from 'react-redux';
import { fetchRegister } from '../../store/actions/auth';

// components
import Input from '../../Components/Input';
import Form from '../../Components/Form';
import Title from '../../Components/Title';
import Button from '../../Components/Button';

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

    this.props.dispatch(fetchRegister(body))
      .then(() => {
        this.props.history.push('/polls');
      });
  }

  render() {
    return (
      <div>
        <Title>Register</Title>
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
          <Button type="submit">Let's go!</Button>
        </Form>
      </div>
    );
  }
}

export default connect()(Register);
