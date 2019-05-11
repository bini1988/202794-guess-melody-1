import React from "react";
import {GenreQuestion} from "../../types.d";

export interface GenreQuestionScreenProps {
  /** Порядковый индекс */
  index: number;
  /** Объект вопроса */
  question: GenreQuestion;
  /** Обработчик выбора вариантов ответов */
  onAnswer?: (result: { index: number; answer: string[] }) => void;
}

const GenreQuestionScreen = (props: GenreQuestionScreenProps): JSX.Element => {
  const {question, onAnswer = () => {}} = props;
  const {genre, answers = []} = question;

  return (
    <section className="game__screen">
      <h2 className="game__title">
        {`Выберите ${genre} треки`}
      </h2>
      <form
        className="game__tracks"
        onSubmit={(event) => {
          event.preventDefault();
          const form = event.target as HTMLFormElement;
          const answerElements = form.elements.namedItem(`answer`) as unknown;

          if (answerElements) {
            const {index} = props;
            const answer = Array.from(answerElements as HTMLInputElement[])
              .filter((it) => it.checked)
              .map((it) => it.value);

            onAnswer({index, answer});
          }
        }}>
        {answers.map((it, index: number) => (
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
                value={it.genre}/>
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
};

export default GenreQuestionScreen;
