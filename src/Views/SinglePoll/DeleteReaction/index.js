import React from 'react';
import styled from 'styled-components';

import Button from '../../../Components/Button';

const DeleteBtn = Button.extend`
  padding: 10px;
  background-color: red;
`;

class DeleteReaction extends React.Component {
  handleOnClick = () => {
    if(this.props.onClick) {
      this.props.onClick();
    }
  }

  render() {
    return <DeleteBtn onClick={this.handleOnClick}>delete</DeleteBtn>
  }
}

export default DeleteReaction;
