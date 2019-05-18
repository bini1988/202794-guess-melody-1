import React, {PureComponent} from "react";
import {GenreQuestion, GameAnswer} from "../../types.d";
import AudioPlayer from "../audio-player/audio-player";

export interface GenreQuestionScreenProps {
  /** Объект вопроса */
  question: GenreQuestion;
  /** Обработчик выбора вариантов ответов */
  onAnswer?: (answer: GameAnswer[]) => void;
}
export interface GenreQuestionScreenState {
  answers: { [key: string]: boolean };
  activePlayerIndex: number;
}

class GenreQuestionScreen extends PureComponent<GenreQuestionScreenProps, GenreQuestionScreenState> {
  public constructor(props: GenreQuestionScreenProps) {
    super(props);

    this.state = {
      answers: {},
      activePlayerIndex: -1,
    };

    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleAnswerWith = this._handleAnswerWith.bind(this);
    this._handlePlayerPlayWith = this._handlePlayerPlayWith.bind(this);
    this._handlePlayerPause = this._handlePlayerPause.bind(this);
  }

  public render() {
    const {answers, activePlayerIndex} = this.state;
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
              <AudioPlayer
                src={it.src}
                isPlaying={activePlayerIndex === index}
                onPlay={this._handlePlayerPlayWith(index)}
                onPause={this._handlePlayerPause}/>
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
    const {question, onAnswer} = this.props;
    const answer = question.answers
      .filter((it, itIndex) => answers[`answer-${itIndex}`]);

    if (onAnswer) {
      onAnswer(answer);
    }
  }

  private _handleAnswerWith(index: string) {
    return () => {
      this.setState(({answers}) => ({
        answers: {...answers, [index]: !answers[index]}
      }));
    };
  }

  private _handlePlayerPlayWith(index: number) {
    return () => {
      this.setState({activePlayerIndex: index});
    };
  }

  private _handlePlayerPause() {
    this.setState({activePlayerIndex: -1});
  }
}

export default GenreQuestionScreen;
