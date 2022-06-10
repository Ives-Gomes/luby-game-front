/* eslint-disable react/jsx-props-no-spreading */
import React, { ButtonHTMLAttributes } from 'react';

import { ButtonStyles } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  background: string;
  color: string;
  borderColor: string;
}

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <ButtonStyles {...rest}>
    {children}
  </ButtonStyles>
);

export default Button;
