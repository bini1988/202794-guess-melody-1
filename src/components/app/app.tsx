import React from "react";
import {connect} from "react-redux";
import {Global} from "@emotion/core";

import * as Styles from "../../common.styles";

import {GameAnswer} from "../../types.d";
import {AppState, handleStep, handleAnswer} from "../../reducer";
import GameScreen from "../game-screen/game-screen";
import WelcomeScreen from "../welcome-screen/welcome-screen";
import GameFooter from "../game-footer/game-footer";

export interface AppProps extends AppState {
  /** Переход к следующему шагу игры */
  handleStep: () => void;
  /** Обработка пользовательского ответа на вопрос */
  handleAnswer: (answers: GameAnswer[]) => void;
}

export function App(props: AppProps) {
  const {maxTime, maxMistakes, mistakes, questions, questionIndex} = props;

  return (
    <React.Fragment>
      <Global
        styles={[
          Styles.fontFaces,
          Styles.body,
          Styles.img,
        ]}/>
      <main className="main">
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
      </main>
      <GameFooter/>
    </React.Fragment>
  );
}

const mapStateToProps = (state: AppState) => state;
const mapDispatchToProps = {handleStep, handleAnswer};

export default connect(mapStateToProps, mapDispatchToProps)(App);
