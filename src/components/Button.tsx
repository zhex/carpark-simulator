import * as React from 'react';
import styled from 'styled-components';

const Button = styled.button`
    padding: 10px 20px;
    border-radius: 5px;
    border: 1px solid #999;
    background: white;
    color: black;
    cursor: pointer;
    outline: 0;

    &[disabled] {
        background: lightgrey;
        border-color: #999;
        color: #999;
    }

    &:active {
        background: #eee;
    }

    & + button {
        margin-left: 15px;
    }
`;

export const PrimaryButton = Button.extend`
    background: green;
    color: white;
    border-color: transparent;
    border-bottom-color: darkgreen;

    &:active {
        background: darkgreen;
    }
`;

export default Button;
