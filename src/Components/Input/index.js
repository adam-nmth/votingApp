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
  color: #05386B;
`;

const StyledInput = styled.input`
  background: transparent;
  border-bottom: 1px solid #05386B;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  padding: 10px;
  color: #05386B;

  &:focus {
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
);

export default Input;
