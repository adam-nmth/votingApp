import React from 'react';
import { connect } from 'react-redux';
import { deletePoll } from '../../store/actions/polls';

class SinglePoll extends React.Component {
  state = {
    poll: {
      question: '',
      yesCount: 0,
      noCount: 0
    },
    showVoteButtons: true
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
        console.log(res)
        if(res.status == 'ok'){
          this.setState({
            poll: {
              ...this.state.poll,
              yesCount: vote ? (this.state.yesCount + 1) : this.state.yesCount,
              noCount: !vote ? (this.state.noCount + 1) : this.state.noCount,
            },
            showVoteButtons: false
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
        console.log(res)
        if(res.status == 'ok'){
          if(this.props.polls.all.length){
            this.props.dispatch(deletePoll(this.props.match.params.id))
          }

          this.props.history.push('/polls');
        }
      });
  }

  render() {
    console.log(this.state)
    return (
      <div>
        <h1>Poll:</h1>
        <h3>{ this.state.poll.question }</h3>
          <div>
            <span>Yes: { this.state.poll.yesCount }</span>
            <span>No: { this.state.poll.noCount }</span>
          </div>
        { !!this.state.showVoteButtons &&
          <div>
            <button onClick={() => this.handleVote(true)}>Yes</button>
            <button onClick={() => this.handleVote(false)}>No</button>
          </div>
        }
        <div>
          <button onClick={this.handleDelete}>delete poll</button>
        </div>
      </div>
    )
  }
}

export default connect(({ auth, polls }) => ({ auth, polls }))(SinglePoll);
