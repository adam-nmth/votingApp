import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  fetchAllPolls
} from '../../store/actions/polls';
import Authorization from '../../Components/Authorization';
import Title from '../../Components/Title';

class Polls extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchAllPolls())
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
      </article>
    ))
  }

  render() {
    return (
      <section>
        <Title>Polls</Title>
        {this.renderPolls()}
        <hr />
        <Link to='/create_poll'>
          + Create New Poll
        </Link>
      </section>
    )
  }
}

export default connect(({ polls, auth }) => ({ polls, auth }))(Authorization(Polls));
