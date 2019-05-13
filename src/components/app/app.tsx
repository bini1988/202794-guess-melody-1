import React, {PureComponent} from "react";
import {PublicSettings, GameQuestion} from "../../types.d";
import GameScreen from "../game-screen/game-screen";
import WelcomeScreen from "../welcome-screen/welcome-screen";

export interface AppProps extends PublicSettings {
  /** Набор вопросов */
  questions: GameQuestion[];
}
export interface AppState {
  /** Номер активного вопроса */
  questionIndex: number;
}

class App extends PureComponent<AppProps, AppState> {
  public constructor(props: AppProps) {
    super(props);

    this.state = {
      questionIndex: -1,
    };

    this._handleAnswer = this._handleAnswer.bind(this);
    this._handleNextQuestion = this._handleNextQuestion.bind(this);
  }

  public render() {
    const {questionIndex} = this.state;
    const {maxTime, maxMistakes, questions} = this.props;

    return (questionIndex >= 0) ? (
      <GameScreen
        questions={questions}
        questionIndex={questionIndex}
        mistakes={3}
        time={3.5 * 60}
        onAnswer={this._handleAnswer}/>
    ) : (
      <WelcomeScreen
        maxTime={maxTime}
        maxMistakes={maxMistakes}
        onBeginClick={this._handleNextQuestion}/>
    );
  }

  private _handleAnswer() {
    this._handleNextQuestion();
    // TODO: Check the answer
  }

  private _handleNextQuestion() {
    const {questionIndex} = this.state;
    const {questions} = this.props;
    const nextQuestionIndex = (questionIndex + 1 < questions.length)
      ? questionIndex + 1 : -1;

    this.setState({questionIndex: nextQuestionIndex});
  }
}

export default App;
