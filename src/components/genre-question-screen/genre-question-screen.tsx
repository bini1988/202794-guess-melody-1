import React, {PureComponent} from "react";
import {GenreQuestion, GameAnswer} from "../../types.d";
import {AudioPlayerProps} from "../../components/audio-player/audio-player";
import withActivePlayer from "../../hocs/with-active-player/with-active-player";

export interface GenreQuestionScreenProps {
  /** Объект вопроса */
  question: GenreQuestion;
  /** Обработчик выбора вариантов ответов */
  onAnswer?: (answer: GameAnswer[]) => void;
  /** Рендер функция плеера */
  renderPlayer?: (index: number, props: AudioPlayerProps) => JSX.Element;
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
    const {question, renderPlayer} = this.props;

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
              {renderPlayer && renderPlayer(index, {src: it.src})}
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
}

export {GenreQuestionScreen};
export default withActivePlayer(GenreQuestionScreen);
