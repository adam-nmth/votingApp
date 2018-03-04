import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  setPolls,
  deletePoll
} from '../../store/actions/polls';

class Polls extends React.Component {
  componentDidMount() {
    fetch('http://localhost:3001/api/polls', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.props.auth.accessToken
      },
      credentials: 'same-origin',
    })
      .then(res => res.json())
      .then((resp) => {
        if (resp.status == 'ok') {
          this.props.dispatch(setPolls(resp.data));
        }
      });
  }

  onDelete(publicUrl) {
    fetch('http://localhost:3001/api/poll/' + publicUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.props.auth.accessToken
      },
      credentials: 'same-origin',
    })

    this.props.dispatch(deletePoll(publicUrl));
  }

  renderPolls() {
    // counts should be turned into percentages
    return this.props.polls.all.map((item, i) => (
      <article key={`poll${i}`} >
        <Link to={`/poll/${item.public_url}`}>
          <h3>{item.question}</h3>
        </Link>
        <Link to={`/poll/${item.public_url}`}>
          <span> see poll </span>
        </Link>
        <button onClick={() => this.onDelete(item.public_url)} >
          X
        </button>
      </article>
    ))
  }

  render() {
    return (
      <section>
        <h1>Polls</h1>
        {this.renderPolls()}
        <hr />
        <Link to='/create_poll'>
          + Create New Poll
        </Link>
      </section>
    )
  }
}

export default connect(({ polls, auth }) => ({ polls, auth }))(Polls);
