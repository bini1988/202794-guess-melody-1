import React, {PureComponent} from "react";
import styled from "@emotion/styled";
import * as Styles from "../../common.styles";
import {GenreQuestion, GameAnswer} from "../../types.d";
import {AudioPlayerProps} from "../../components/audio-player/audio-player";
import withActivePlayer from "../../hocs/with-active-player/with-active-player";
import AnswerLabel, {Label} from "./components/answer-label";

const Wrapper = styled.section`
  position: relative;
  width: 460px;
  margin: 0 auto;
  margin-top: 75px;
  margin-bottom: 85px;
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

export const GenreForm = styled.form``;

const AnswerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 55px;
  margin-bottom: 30px;
`;

const Answer = styled.div`
  width: 35px;
  height: 49px;
`;

const AnswerInput = styled.input`
  ${Styles.hidden}

  &:checked + ${Label} {
    fill: #ff9749;
  }
`;

const SubmitButton = styled.button`
  ${Styles.button}
  font-style: italic;
  margin: 35px auto 15px;
`;

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
      <Wrapper>
        <Title>{`Выберите ${question.genre} треки`}</Title>
        <GenreForm
          onSubmit={this._handleSubmit}>
          {question.answers.map((it, index: number) => (
            <AnswerWrapper key={`answer-${index}`}>
              {renderPlayer && renderPlayer(index, {src: it.src})}
              <Answer>
                <AnswerInput
                  type="checkbox"
                  name="answer"
                  id={`answer-${index}`}
                  value={it.genre}
                  checked={Boolean(answers[`answer-${index}`])}
                  onChange={this._handleAnswerWith(`answer-${index}`)}/>
                <AnswerLabel
                  htmlFor={`answer-${index}`}
                  text={answers[`answer-${index}`]
                    ? `Сбросить трек #${index + 1}`
                    : `Отметить трек #${index + 1}`
                  }/>
              </Answer>
            </AnswerWrapper>
          ))}
          <SubmitButton type="submit">
            {`Ответить`}
          </SubmitButton>
        </GenreForm>
      </Wrapper>
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
