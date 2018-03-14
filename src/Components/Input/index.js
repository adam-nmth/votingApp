import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
`;

const Label = styled.label`
  font-weight: bold;
  font-size: 18px;
`;

const StyledInput = styled.input`
  background: white;
  border: 0;
  padding: 5px;

  &:focus{
    outline: 0;
  }
`;

const Input = ({ label, value, onChange, type, placeholder }) => (
  <Wrapper>
    <Label>{label}</Label>
    <StyledInput
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
    />
  </Wrapper>
)

export default Input;
