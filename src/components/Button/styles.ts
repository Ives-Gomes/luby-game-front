/* eslint-disable import/prefer-default-export */
import styled, { css } from 'styled-components';

interface ButtonStylesProps {
  background: string;
  color: string;
  borderColor: string;
}

export const ButtonStyles = styled.button<ButtonStylesProps>`
  width: 150px;
  height: 35px;

  display: flex;
  justify-content: center;
  align-items: center;

  ${(props) => css`
    background: ${props.background};
  `}
  ${(props) => css`
    color: ${props.color};
  `}
  ${(props) => css`
    border: 1px solid ${props.borderColor};
  `}

  box-shadow: 1px 1px 5px #707070;

  border-radius: 5px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;
