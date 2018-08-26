import React from 'react';
import styled from 'styled-components';
import Button from '../../../Components/Button';

const VoteButton = styled(Button)`
  margin: 10px;
  padding: 5px 10px;
  cursor: ${({ hasVoted }) => hasVoted ? 'default' : 'pointer'};
`;

class VoteReaction extends React.Component {
  handleVoteReaction = () => {
    if(this.props.onClick && !this.props.hasVoted) {
      this.props.onClick();
    }
  }

  render() {
    return (
      <VoteButton onClick={this.handleVoteReaction} hasVoted={this.props.hasVoted}>
        {this.props.title + ' - ' + this.props.voteCount}
      </VoteButton>
    )
  }
}

export default VoteReaction;
