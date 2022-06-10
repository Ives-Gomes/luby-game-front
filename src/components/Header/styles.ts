import styled from 'styled-components';

export const Container = styled.div`
  height: 50px;

  display: flex;
  justify-content: space-between;

  background-color: blue;

  padding: 0 50px;
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Account = styled.p`
  font-size: 14px;
  font-weight: 600;

  color: #fff;

  margin-left: 10px;
`;

export const GameBalance = styled.p`
  font-size: 16px;
  font-weight: 600;

  color: #fff;

  margin-left: 20px;
`;

export const PlayerBalance = styled.div`
  width: 150px;
  height: 35px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 16px;
  font-weight: 600;

  border-radius: 5px;

  background-color: #fff;
  color: #00e;
`;
