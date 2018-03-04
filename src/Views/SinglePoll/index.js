import React from 'react';

class SinglePoll extends React.Component {
  state = {
    poll: {
      question: '',
      yesCount: 0,
      noCount: 0
    }
  }

  componentDidMount() {
    const token = localStorage.getItem('accessToken');
    fetch('http://localhost:3001/api/poll/' + this.props.match.params.id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token // make this from reducer
      },
      credentials: 'same-origin',
    })
      .then(res => res.json())
      .then((res) => {
        console.log(res)
        this.setState({
          poll: res.data
        })
      });
  }

  handleVote(vote) {
    // do something
  }

  render() {
    return (
      <div>
        <h1>Poll:</h1>
        <h3>{ this.state.poll.question }</h3>
        <div>
          <span>Yes: { this.state.poll.yesCount }</span>
          <span>No: { this.state.poll.noCount }</span>
        </div>
        <div>
          <button onClick={() => this.handleVote(true)}>Yes</button>
          <button onClick={() => this.handleVote(false)}>No</button>
        </div>
        <div>
          <button>delete poll</button>
        </div>
      </div>
    )
  }
}

export default SinglePoll;
