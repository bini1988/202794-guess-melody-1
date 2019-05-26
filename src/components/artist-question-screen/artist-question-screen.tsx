import React from "react";
import {ArtistQuestion} from "../../types.d";
import AudioPlayer from "../audio-player/audio-player";

export interface ArtistQuestionScreenProps {
  /** Порядковый индекс */
  index: number;
  /** Объект вопроса */
  question: ArtistQuestion;
  /** Обработчик выбора варианта ответов */
  onAnswer?: (result: { index: number; answer: string }) => void;
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
      <form
        className="game__artist"
        onChange={(event) => {
          const answerElement = event.target as HTMLInputElement;
          const answer = answerElement.value;
          const {index} = props;
          onAnswer({index, answer});
        }}>
        {answers.map(({artist, picture}, index: number) => (
          <div className="artist" key={`artist-${index}`}>
            <input
              className="artist__input visually-hidden"
              type="radio"
              name="answer"
              id={`artist-${index}`}
              value={artist}/>
            <label
              className="artist__name"
              htmlFor={`artist-${index}`}>
              <img
                className="artist__picture"
                src={picture}
                alt={artist}/>
              {artist}
            </label>
          </div>
        ))}
      </form>
    </section>
  );
};

export default ArtistQuestionScreen;
