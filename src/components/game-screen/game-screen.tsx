import React, {PureComponent} from "react";
import {RouteComponentProps} from "@reach/router";
import styled from "@emotion/styled";
import * as Styles from "../../common.styles";
import {GameQuestion, GameAnswer, QuestionTypes} from "../../types.d";

import GameMistakes from "../game-mistakes";
import ArtistQuestionScreen from "../artist-question-screen";
import GenreQuestionScreen from "../genre-question-screen";
import TimerProgress from "./components/timer-progress";

const TimerDots = styled.span`
  vertical-align: top;
  line-height: 32px;
  animation: ${Styles.blink} 1000ms steps(1, end) infinite;
`;

const TimerValue = styled.div`
  min-width: 120px;
  height: 36px;
  font-size: 30px;
  line-height: 36px;
  color: #ff9749;
  text-align: center;
  animation: ${(props) => (props.className === `finished`) && Styles.shrink};
  animation-duration: 2000ms;
  animation-iteration-count: infinite;

  ${TimerDots} {
    animation: ${(props) => (props.className === `finished`) && `none`};
  }
`;

const BackLink = styled.a`
  position: relative;
  padding-left: 50px;
  transition: opacity ease-in-out 300ms;

  &:before {
    content: "";
    position: absolute;
    top: 20px;
    left: 0px;
    width: 40px;
    height: 40px;
    background-image: url("../img/right-arrow.svg");
    background-repeat: no-repeat;
    background-size: 40px;
    transform: rotate(180deg);
  }
  &:hover, &:active, &:focus {
    opacity: 0.7;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin-bottom: 40px;
`;

export interface GameScreenProps {
  /** Набор вопросов */
  questions?: GameQuestion[];
  /** Номер активного вопроса */
  questionIndex?: number;
  /** Время на ответ, секунд */
  time?: number;
  /** Количество совершенных ошибок */
  mistakes?: number;
  /** Обработчик выбора варианта ответов */
  onAnswer: (answer: GameAnswer[]) => void;
}

class GameScreen extends PureComponent<GameScreenProps & RouteComponentProps> {
  public render() {
    return (
      <React.Fragment>
        {this._renderHeader()}
        {this._renderQuestion()}
      </React.Fragment>
    );
  }

  public componentDidMount() {
    // this.props.fetchQuestions();
  }

  private _renderHeader() {
    const {mistakes = 0, time = 0} = this.props;
    const timeMinutes = Math.trunc(time / 60);
    const timeSeconds = time - timeMinutes * 60;

    return (
      <Header>
        <BackLink href="#">
          <span css={Styles.hidden}>
            {`Сыграть ещё раз`}
          </span>
          <img
            src="img/melody-logo-ginger.png"
            alt="Угадай мелодию"
            width="177"
            height="76"/>
        </BackLink>
        <TimerValue
          className="finished">
          {`${timeMinutes}`.padStart(2, `0`)}
          <TimerDots>{`:`}</TimerDots>
          {`${timeSeconds}`.padStart(2, `0`)}
        </TimerValue>
        <TimerProgress
          progress={50}/>
        <GameMistakes
          mistakes={mistakes}/>
      </Header>
    );
  }

  private _throw(arg: never) {
    throw new Error(arg);
  }

  private _renderQuestion() {
    const {questions = [], questionIndex = 0, onAnswer} = this.props;
    const question = questions[questionIndex];

    if (!question) {
      return null;
    }

    switch (question.type) {
      case QuestionTypes.Artist:
        return <ArtistQuestionScreen
          key={`question-${questionIndex}`}
          question={question}
          onAnswer={onAnswer}/>;
      case QuestionTypes.Genre:
        return <GenreQuestionScreen
          key={`question-${questionIndex}`}
          question={question}
          onAnswer={onAnswer}/>;
    }

    return this._throw(question);
  }
}

export default GameScreen;
