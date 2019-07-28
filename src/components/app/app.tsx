import React from "react";
import {Router} from "@reach/router";
import {Global} from "@emotion/core";
import styled from "@emotion/styled";

import * as Styles from "../../common.styles";

import {GameAnswer} from "../../types.d";
import GameScreen from "../game-screen";
import WelcomeScreen from "../welcome-screen";
import AppFooter from "../app-footer";

const globalStyles = [
  Styles.fontFaces,
  Styles.body,
  Styles.img
];

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: url("../img/vinyl.png") center no-repeat;
`;

const AppMain = styled.main`
  ${Styles.container}
`;

export interface AppProps {
  /** Переход к следующему шагу игры */
  handleStep: () => void;
  /** Обработка пользовательского ответа на вопрос */
  handleAnswer: (answers: GameAnswer[]) => void;
}

export function App(props: AppProps) {
  return (
    <AppWrapper>
      <Global
        styles={globalStyles}/>
      <AppMain>
        <Router>
          <WelcomeScreen
            path="/"
            onBeginClick={props.handleStep}/>
          <GameScreen
            path="/game"
            onAnswer={props.handleAnswer}/>
        </Router>
      </AppMain>
      <AppFooter/>
    </AppWrapper>
  );
}

export default App;
