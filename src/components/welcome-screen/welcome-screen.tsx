import React, {MouseEvent} from "react";
import * as Styles from "../../common.styles";
import styled from "@emotion/styled";

const WelcomeWrapper = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
  position: relative;
  box-sizing: border-box;
  padding: 190px 0px 130px;
  width: 100%;
  height: 100%;
`;

const Logo = styled.div`
  margin: 25px 0px;
`;

export const Button = styled.button`
  padding: 0;
  margin: 80px 0px 35px;
  margin-left: 20px;
  width: 100px;
  height: 140px;
  background: transparent;
  border: none;
  outline: none;
  transition: transform ease-in-out 300ms;
  cursor: pointer;

  &:hover, &:focus {
    transform: scale(1.05);
  }
  &:active {
    transform: scale(1.04);
  }
  & > svg {
    filter: drop-shadow(5px 5px 5px rgba(0,0,0,0.4));
  }
`;

const Title = styled.h2`
  margin: 0;
  font-style: italic;
  font-weight: 300;
  font-size: 33px;
  color: #230d1a;
  margin-top: 20px;
`;

const Text = styled.p`
  margin: 10px 0px;
`;

const ItemsList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  text-align: center;
`;

export interface WelcomeScreenProps {
  /** Игровое время, мин */
  maxTime: number;
  /** Количество допустимых ошибок */
  maxMistakes: number;
  /** Обработчки клика по кнопке запуска игры */
  onBeginClick?: (event: MouseEvent<HTMLElement>) => void;
}

function WelcomeScreen(props: WelcomeScreenProps): JSX.Element {
  const {maxTime, maxMistakes, onBeginClick} = props;

  return (
    <WelcomeWrapper>
      <Logo>
        <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"/>
      </Logo>
      <Button onClick={onBeginClick}>
        <svg height="140" width="100" fill="#ff9749">
          <polygon points="0,0 100,70 0,140"/>
        </svg>
        <span css={Styles.hidden}>{`Начать игру`}</span>
      </Button>
      <Title>{`Правила игры`}</Title>
      <Text>{`Правила просты:`}</Text>
      <ItemsList>
        <li>{`За ${maxTime} минут нужно ответить на все вопросы.`}</li>
        <li>{`Можно допустить ${maxMistakes} ошибки.`}</li>
      </ItemsList>
      <Text>{`Удачи!`}</Text>
    </WelcomeWrapper>
  );
}

export default WelcomeScreen;
