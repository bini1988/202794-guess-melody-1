import React from "react";
import {connect} from "react-redux";
import {Global} from "@emotion/core";
import styled from "@emotion/styled";

import * as Styles from "../../common.styles";

import {GameAnswer} from "../../types.d";
import {AppState, handleStep, handleAnswer} from "../../reducer";
import GameScreen from "../game-screen/game-screen";
import WelcomeScreen from "../welcome-screen";
import AppFooter from "../app-footer";

const AppWrapper = styled.div`
  position: relative;
  box-sizing: border-box;
  background: url("../img/vinyl.png") center no-repeat;
`;

const AppMain = styled.main`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
`;

export interface AppProps extends AppState {
  /** Переход к следующему шагу игры */
  handleStep: () => void;
  /** Обработка пользовательского ответа на вопрос */
  handleAnswer: (answers: GameAnswer[]) => void;
}

export function App(props: AppProps) {
  const {maxTime, maxMistakes, mistakes, questions, questionIndex} = props;

  return (
    <AppWrapper>
      <Global
        styles={[
          Styles.fontFaces,
          Styles.body,
          Styles.img,
        ]}/>
      <AppMain>
        {(questionIndex >= 0) ? (
          <GameScreen
            questions={questions}
            questionIndex={questionIndex}
            mistakes={mistakes}
            time={3.5 * 60}
            onAnswer={props.handleAnswer}/>
        ) : (
          <WelcomeScreen
            maxTime={maxTime}
            maxMistakes={maxMistakes}
            onBeginClick={props.handleStep}/>
        )}
      </AppMain>
      <AppFooter/>
    </AppWrapper>
  );
}

const mapStateToProps = (state: AppState) => state;
const mapDispatchToProps = {handleStep, handleAnswer};

export default connect(mapStateToProps, mapDispatchToProps)(App);
