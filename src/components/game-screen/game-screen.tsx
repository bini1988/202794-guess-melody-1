import React, {PureComponent} from "react";
import {GameQuestion, QuestionTypes, GenreQuestion, ArtistQuestion} from "../../types.d";
import ArtistQuestionScreen from "../artist-question-screen/artist-question-screen";
import GenreQuestionScreen from "../genre-question-screen/genre-question-screen";

export interface GameScreenProps {
  /** Набор вопросов */
  questions: GameQuestion[];
  /** Номер активного вопроса */
  questionIndex: number;
  /** Время на ответ, секунд */
  time: number;
  /** Количество совершенных ошибок */
  mistakes: number;
  /** Обработчик выбора варианта ответов */
  onAnswer: (result: { index: number; answer: string | string[] }) => void;
}

class GameScreen extends PureComponent<GameScreenProps> {
  public render() {
    const {questions, questionIndex} = this.props;
    const question = questions[questionIndex];
    const type = question && question.type;
    const mode = (type && `game--${type}`) || ``;

    return (
      <section className={`game ${mode}`}>
        {this._renderHeader()}
        {this._renderQuestion()}
      </section>
    );
  }

  private _renderHeader() {
    const {time, mistakes} = this.props;
    const timeMinutes = Math.trunc(time / 60);
    const timeSeconds = time - timeMinutes * 60;

    return (
      <header className="game__header">
        <a className="game__back" href="#">
          <span className="visually-hidden">
            {`Сыграть ещё раз`}
          </span>
          <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию"/>
        </a>
        <svg className="timer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 780 780">
          <circle className="timer__line" cx="390" cy="390" r="370" style={{
            filter: `url(#blur)`,
            transform: `rotate(-90deg) scaleY(-1)`,
            transformOrigin: `center`
          }}/>
        </svg>
        <div className="timer__value">
          <span className="timer__mins">
            {`${timeMinutes}`.padStart(2, `0`)}
          </span>
          <span className="timer__dots">{`:`}</span>
          <span className="timer__secs">
            {`${timeSeconds}`.padStart(2, `0`)}
          </span>
        </div>
        <div className="game__mistakes">
          {Array.from(new Array(mistakes)).map((it, index) => (
            <div key={index} className="wrong"/>
          ))}
        </div>
      </header>
    );
  }

  private _renderQuestion() {
    const {questions, questionIndex, onAnswer} = this.props;
    const question = questions[questionIndex];

    if (!question) {
      return null;
    }

    switch (question.type) {
      case QuestionTypes.Artist:
        return <ArtistQuestionScreen
          question={question as ArtistQuestion}
          index={questionIndex}
          onAnswer={onAnswer}/>;
      case QuestionTypes.Genre:
        return <GenreQuestionScreen
          question={question as GenreQuestion}
          index={questionIndex}
          onAnswer={onAnswer}/>;
    }

    return null;
  }
}

export default GameScreen;
