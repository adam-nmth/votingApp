import React from 'react';
import styled from 'styled-components';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 415px;
  padding: 20px;
  border-radius: 4px;
`;

const Form = ({ children, onSubmit }) => (
  <StyledForm
    onSubmit={onSubmit}
  >
    {children}
  </StyledForm>
)

export default Form;
