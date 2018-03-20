import React from 'react';
import { connect } from 'react-redux';
import { deletePoll } from '../../store/actions/polls';
import Authorization from '../../Components/Authorization';

class SinglePoll extends React.Component {
  state = {
    poll: {
      question: '',
      yesCount: 0,
      noCount: 0
    }
  }

  handleDelete = this.handleDelete.bind(this)

  componentDidMount() {
    fetch('http://localhost:3001/api/poll/' + this.props.match.params.id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.props.auth.accessToken // make this from reducer
      },
      credentials: 'same-origin',
    })
      .then(res => res.json())
      .then((res) => {
        this.setState({
          poll: res.data
        })
      });
  }

  handleVote(vote) {
    fetch('http://localhost:3001/api/vote/' + this.state.poll._id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.props.auth.accessToken
      },
      body: JSON.stringify({ vote }),
      credentials: 'same-origin',
    })
      .then(res => res.json())
      .then((res) => {
        if(res.status == 'ok'){
          const { yesCount, noCount } = this.state.poll;
          this.setState({
            poll: {
              ...this.state.poll,
              yesCount: vote ? (yesCount + 1) : yesCount,
              noCount: !vote ? (noCount + 1) : noCount,
              hasVoted: true
            }
          })
        }
      });
  }

  handleDelete() {
    fetch('http://localhost:3001/api/poll/' + this.props.match.params.id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.props.auth.accessToken
      },
      credentials: 'same-origin',
    })
      .then(res => res.json())
      .then((res) => {
        if(res.status == 'ok'){
          if(this.props.polls.all.length){
            this.props.dispatch(deletePoll(this.props.match.params.id))
          }

          this.props.history.push('/polls');
        }
      });
  }

  render() {
    const myPoll = this.props.auth.personalData._id === this.state.poll.userId;
    return (
      <div>
        <h1>Poll:</h1>
        <h3>{ this.state.poll.question }</h3>
          <div>
            <span>Yes: { this.state.poll.yesCount }</span>
            <span>No: { this.state.poll.noCount }</span>
          </div>
        { !this.state.poll.hasVoted &&
          <div>
            <button onClick={() => this.handleVote(true)}>Yes</button>
            <button onClick={() => this.handleVote(false)}>No</button>
          </div>
        }
        { !!myPoll && 
          <div>
            <button onClick={this.handleDelete}>delete poll</button>
          </div>
        }
      </div>
    )
  }
}

export default connect(({ auth, polls }) => ({ auth, polls }))(Authorization(SinglePoll));
