import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import PieChart from 'react-minimal-pie-chart';
import {
  fetchSinglePoll,
  fetchVote,
  fetchDeletePoll,
  deletePoll
} from '../../store/actions/polls';
import Authorization from '../../Components/Authorization';
import Title from '../../Components/Title';
import VoteReaction from './VoteReaction';
import DeleteReaction from './DeleteReaction';

const PollTitle = styled.h3`
  color: #05386b;
`;

class SinglePoll extends React.Component {
  state = {
    poll: {
      question: '',
      yesCount: 0,
      noCount: 0
    }
  };

  handleDelete = this.handleDelete.bind(this);

  componentDidMount() {
    const { id: pollId } = this.props.match.params;
    this.props.dispatch(fetchSinglePoll(pollId)).then(res => {
      this.setState({
        poll: res.data
      });
    });
  }

  handleVote(vote) {
    this.props.dispatch(fetchVote(vote, this.state.poll._id)).then(res => {
      if (res.status == 'ok') {
        const { yesCount, noCount } = this.state.poll;
        this.setState({
          poll: {
            ...this.state.poll,
            yesCount: vote ? yesCount + 1 : yesCount,
            noCount: !vote ? noCount + 1 : noCount,
            hasVoted: true
          }
        });
      }
    });
  }

  handleDelete() {
    const { id: pollId } = this.props.match.params;
    this.props.dispatch(fetchDeletePoll(pollId)).then(res => {
      if (res.status == 'ok') {
        if (this.props.polls.all.length) {
          this.props.dispatch(deletePoll(this.props.match.params.id));
        }

        this.props.history.push('/polls');
      }
    });
  }

  render() {
    const myPoll = this.props.auth.personalData._id === this.state.poll.userId;
    return (
      <div>
        <Title>Poll:</Title>
        <PollTitle>{this.state.poll.question}</PollTitle>
        {(!!this.state.poll.yesCount || !!this.state.poll.noCount) && (
          <PieChart
            data={[
              { value: Number(this.state.poll.noCount), color: '#E38627' },
              { value: Number(this.state.poll.yesCount), color: '#6A2135' }
            ]}
          />
        )}
        <div style={{ justifyContent: 'center', display: 'flex' }}>
          <VoteReaction
            hasVoted={this.state.poll.hasVoted}
            title="Yes"
            voteCount={this.state.poll.yesCount}
            onClick={() => this.handleVote(true)}
          />
          <VoteReaction
            hasVoted={this.state.poll.hasVoted}
            title="No"
            voteCount={this.state.poll.noCount}
            onClick={() => this.handleVote(false)}
          />
        </div>
        {!!myPoll && (
          <div>
            <DeleteReaction onClick={this.handleDelete} />
          </div>
        )}
      </div>
    );
  }
}

export default connect(({ auth, polls }) => ({ auth, polls }))(
  Authorization(SinglePoll)
);
