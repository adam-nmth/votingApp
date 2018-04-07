import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
    margin-top: 15px;
    padding: ${props => props.padding || '5px'};
    font-size: 20px;
    border: 0;
    background: #05386B;
    color: white;
    border-radius: 3px;
    cursor: pointer;
`;

export default Button;
