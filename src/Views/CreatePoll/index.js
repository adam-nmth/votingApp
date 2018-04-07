import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { addNewPoll } from '../../store/actions/polls';
import Authorization from '../../Components/Authorization';
import Title from '../../Components/Title';
import Form from '../../Components/Form';
import Button from '../../Components/Button';
import { fetchCreatePoll } from '../../store/actions/polls';

const Wrapper = styled.div`

`;

class CreatePoll extends React.Component {
  state = {
    text: '',
    response: false
  }

  onChange = this.onChange.bind(this)
  onSubmit = this.onSubmit.bind(this)

  onChange(e) {
    this.setState({ text: e.target.value });
  }

  onSubmit(e) {
    if(this.state.text.length) {
      e.preventDefault();

      const token = localStorage.getItem('accessToken')
      const body = {
        question: this.state.text,
      }
      this.props.dispatch(fetchCreatePoll(body))
        .then((response) => {
          if(response.status == 'ok'){
            this.setState({ response: 'Poll saved' });
            this.props.dispatch(addNewPoll(response.data));
          }
        })
        .then(() => {
          return new Promise((res) => {
            setTimeout(() => {
              this.setState({ response: false });
              res();
            }, 2000)
          })
        })
        .then(() => this.props.history.push('/polls'));
    }
  }

  render() {
    return (
      <Wrapper>
        <Title>Create Poll</Title>
        <Form onSubmit={this.onSubmit} >
          { !this.state.response && <textarea required onChange={this.onChange} /> }
          {!!this.state.response && 
            <div>{ this.state.response }</div>
          }
          { !this.state.response && <Button type='submit'>Start Poll</Button> }
        </Form>
      </Wrapper>
    )
  }
}

export default connect(({ polls }) => ({ polls }))(Authorization(CreatePoll));
