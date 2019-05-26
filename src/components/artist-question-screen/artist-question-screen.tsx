import React from "react";
import {ArtistQuestion, GameAnswer} from "../../types.d";
import AudioPlayer from "../audio-player/audio-player";

export interface ArtistQuestionScreenProps {
  /** Объект вопроса */
  question: ArtistQuestion;
  /** Обработчик выбора варианта ответов */
  onAnswer?: (answer: GameAnswer[]) => void;
}

const ArtistQuestionScreen = (props: ArtistQuestionScreenProps): JSX.Element => {
  const {question, onAnswer = () => {}} = props;
  const {song, answers = []} = question;

  return (
    <section className="game__screen">
      <h2 className="game__title">
        {`Кто исполняет эту песню?`}
      </h2>
      <AudioPlayer
        src={song.src}/>
      <form className="game__artist">
        {answers.map((answer, index: number) => (
          <div className="artist" key={`artist-${index}`}>
            <input
              className="artist__input visually-hidden"
              type="radio"
              name="answer"
              id={`artist-${index}`}
              value={answer.artist}
              onChange={() => onAnswer([answer])}/>
            <label
              className="artist__name"
              htmlFor={`artist-${index}`}>
              <img
                className="artist__picture"
                src={answer.picture}
                alt={answer.artist}/>
              {answer.artist}
            </label>
          </div>
        ))}
      </form>
    </section>
  );
};

export default ArtistQuestionScreen;
