import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { fetchAllPolls } from '../../store/actions/polls';
import Authorization from '../../Components/Authorization';
import Title from '../../Components/Title';
import Button from '../../Components/Button';

const PollWrapper = styled.article`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 10px;
  border-radius: 3px;
  box-shadow: #999 0px 2px 4px;
  margin-bottom: 10px;
`;

const PollTitle = styled.h3`
  color: #05386b;
`;

const PollButton = styled.span`
  color: #05386b;
`;

class Polls extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchAllPolls());
  }

  renderPolls() {
    // counts should be turned into percentages
    return this.props.polls.all.map((item, i) => (
      <PollWrapper key={`poll${i}`}>
        <Link to={`/poll/${item.public_url}`}>
          <PollTitle>{item.question}</PollTitle>
        </Link>
        <Link to={`/poll/${item.public_url}`}>
          <PollButton> See Poll </PollButton>
        </Link>
      </PollWrapper>
    ));
  }

  render() {
    return (
      <section>
        <Title>Polls</Title>
        {this.renderPolls()}
        <hr />
        <Link to="/create_poll">
          <Button padding={'5px 10px'}>+ Create New Poll</Button>
        </Link>
      </section>
    );
  }
}

export default connect(({ polls, auth }) => ({ polls, auth }))(
  Authorization(Polls)
);
