import React, {PureComponent} from "react";
import {GenreQuestion} from "../../types.d";

export interface GenreQuestionScreenProps {
  /** Порядковый индекс */
  index: number;
  /** Объект вопроса */
  question: GenreQuestion;
  /** Обработчик выбора вариантов ответов */
  onAnswer?: (result: { index: number; answer: string[] }) => void;
}
export interface GenreQuestionScreenState {
  answers: { [key: string]: boolean };
}

class GenreQuestionScreen extends PureComponent<GenreQuestionScreenProps, GenreQuestionScreenState> {
  public constructor(props: GenreQuestionScreenProps) {
    super(props);

    this.state = {
      answers: {},
    };

    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleAnswerWith = this._handleAnswerWith.bind(this);
  }

  public render() {
    const {answers} = this.state;
    const {question} = this.props;

    return (
      <section className="game__screen">
        <h2 className="game__title">
          {`Выберите ${question.genre} треки`}
        </h2>
        <form
          className="game__tracks"
          onSubmit={this._handleSubmit}>
          {question.answers.map((it, index: number) => (
            <div className="track" key={`answer-${index}`}>
              <button className="track__button track__button--play" type="button"/>
              <div className="track__status">
                <audio>
                  <source src={it.src} type="audio/ogg; codecs=vorbis"/>
                </audio>
              </div>
              <div className="game__answer">
                <input
                  className="game__input visually-hidden"
                  type="checkbox"
                  name="answer"
                  id={`answer-${index}`}
                  value={it.genre}
                  checked={Boolean(answers[`answer-${index}`])}
                  onChange={this._handleAnswerWith(`answer-${index}`)}/>
                <label
                  className="game__check"
                  htmlFor={`answer-${index}`}>
                  {`Отметить`}
                </label>
              </div>
            </div>
          ))}
          <button className="game__submit button" type="submit">
            {`Ответить`}
          </button>
        </form>
      </section>
    );
  }

  private _handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const {answers} = this.state;
    const {index, question, onAnswer} = this.props;
    const answer = question.answers
      .filter((it, itIndex) => answers[`answer-${itIndex}`])
      .map((it) => it.genre);

    if (onAnswer) {
      onAnswer({index, answer});
    }
  }

  private _handleAnswerWith(index: string) {
    return () => {
      this.setState(({answers}) => ({
        answers: {...answers, [index]: !answers[index]}
      }));
    };
  }
}

export default GenreQuestionScreen;
