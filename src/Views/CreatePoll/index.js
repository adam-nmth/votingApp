import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { addNewPoll } from '../../store/actions/polls';
import Authorization from '../../Components/Authorization';
import Title from '../../Components/Title';

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

      fetch('http://localhost:3001/api/create/poll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        credentials: 'same-origin',
        body: JSON.stringify(body),
      })
        .then(res => res.json())
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
        <form onSubmit={this.onSubmit} >
          <textarea required onChange={this.onChange} />
          {!!this.state.response && 
            <div>{ this.state.response }</div>
          }
          <button>start Poll</button>
        </form>
      </Wrapper>
    )
  }
}

export default connect(({ polls }) => ({ polls }))(Authorization(CreatePoll));
