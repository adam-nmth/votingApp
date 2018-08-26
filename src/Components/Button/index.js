import React from 'react';
import styled from 'styled-components';

import colors from '../../utils/colors';

const Button = styled.button`
    margin-top: 15px;
    padding: ${props => props.padding || '5px'};
    font-size: 20px;
    border: 0;
    background: ${({ hasVoted }) => hasVoted ? "transparent" : "#05386B"};
    color: ${({ hasVoted }) => hasVoted ? colors.blue : 'white'};
    border-radius: 3px;
    cursor: pointer;
`;

export default Button;
