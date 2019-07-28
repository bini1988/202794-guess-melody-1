import React from "react";
import styled from "@emotion/styled";
import * as Styles from "../../common.styles";
import {ArtistQuestion, GameAnswer} from "../../types.d";
import AudioPlayer from "../audio-player";

const Wrapper = styled.section`
  position: relative;
  width: 440px;
  margin: 0 auto;
  margin-top: 150px;
  margin-bottom: 105px;
`;

const Title = styled.h2`
  margin: 0;
  margin-bottom: 30px;
  font-size: 33px;
  font-weight: 300;
  font-style: italic;
  color: #230d1a;
  text-align: center;
`;

export const ArtistForm = styled.form`
  display: flex;
  justify-content: space-between;
  margin-top: 80px;
`;

const ArtistPicture = styled.div`
  box-sizing: border-box;
  width: 134px;
  height: 134px;
  margin-bottom: 5px;
  background-color: #f0eed5;
  border: solid 5px #230d1a;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 5px 5px 15px -5px #000;
  transition: border-color ease-in-out 350ms;

  img {
    max-width: 100%;
    height: auto;
    transform: scale(1.1);
  }
`;

const ArtistLabel = styled.label``;

const ArtistItem = styled.div`
  width: 134px;
  text-align: center;
  cursor: pointer;

  &:hover ${ArtistPicture} {
    border-color: #ff9749;
  }
  &:active ${ArtistPicture} {
    border-color: #f00000;
  }
`;

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
    <Wrapper>
      <Title>{`Кто исполняет эту песню?`}</Title>
      <AudioPlayer
        src={song.src}/>
      <ArtistForm>
        {answers.map((answer, index: number) => (
          <ArtistItem
            key={`artist-${index}`}>
            <input
              css={Styles.hidden}
              type="radio"
              name="answer"
              id={`artist-${index}`}
              value={answer.artist}
              onChange={() => onAnswer([answer])}/>
            <ArtistLabel
              htmlFor={`artist-${index}`}>
              <ArtistPicture>
                <img
                  src={answer.picture}
                  alt={answer.artist}
                  width="134"
                  height="134"/>
              </ArtistPicture>
              {answer.artist}
            </ArtistLabel>
          </ArtistItem>
        ))}
      </ArtistForm>
    </Wrapper>
  );
};

export default ArtistQuestionScreen;
