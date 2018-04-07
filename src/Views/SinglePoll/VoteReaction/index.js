import React from 'react';
import styled from 'styled-components';
import Button from '../../../Components/Button';

const VoteButton = styled(Button)`
  margin: 10px;
  padding: 5px 10px;
`;

class VoteReaction extends React.Component {
  render() {
    return (
      <VoteButton>
        {this.props.title + ' - ' + this.props.voteCount}
      </VoteButton>
    )
  }
}

export default VoteReaction;
