import React from "react";
import {ArtistSong, ArtistAnswer} from "../../types.d";

export interface ArtistQuestionScreenProps {
  /** Порядковый индекс */
  index: number;
  /** Жанр определяемого трека */
  song: ArtistSong;
  /** Варианты ответов */
  answers: ArtistAnswer[];
  /** Обработчик выбора варианта ответов */
  onAnswer?: (result: { index: number; answer: string }) => void;
}

const ArtistQuestionScreen = (props: ArtistQuestionScreenProps): JSX.Element => {
  const {song, answers = [], onAnswer = () => {}} = props;

  return (
    <section className="game__screen">
      <h2 className="game__title">
        {`Кто исполняет эту песню?`}
      </h2>
      <div className="game__track">
        <button className="track__button track__button--play" type="button"/>
        <audio>
          <source src={song.src} type="audio/ogg; codecs=vorbis"/>
        </audio>
      </div>
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
