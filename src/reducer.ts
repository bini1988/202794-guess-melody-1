import {Action} from "redux";
import {ThunkAction} from "redux-thunk";
import {GameQuestion, QuestionTypes, GameAnswer, ArtistAnswer, GenreAnswer} from "./types.d";
import * as Mocks from "./mocks/game";

export enum ActionsTypes {
  // eslint-disable-next-line quotes
  RestartGame = "RESTART_GAME",
  // eslint-disable-next-line quotes
  NextStep = "NEXT_STEP",
  // eslint-disable-next-line quotes
  HandleAnswer = "HANDLE_ANSWER",
}

export interface RestartGameAction extends Action<string> {
  type: ActionsTypes.RestartGame;
}

export interface NextStepAction extends Action<string> {
  type: ActionsTypes.NextStep;
}

export interface HandleAnswerAction extends Action<string> {
  type: ActionsTypes.HandleAnswer;
  payload: { mistakes: number };
}


export type AppActionTypes = RestartGameAction | NextStepAction | HandleAnswerAction
export type AppThunkAction = ThunkAction<void, AppState, null, AppActionTypes>

/**
 * Начать новую игру
 * @return {AppActionTypes}
 */
export const restartGame = (): RestartGameAction => {
  return {type: ActionsTypes.RestartGame};
};

/**
 * Перейти к следующему шагу игры
 * @return {AppActionTypes}
 */
export const handleStep = (): AppThunkAction => {
  return (dispatch, getState) => {
    const {questions, questionIndex, mistakes, maxMistakes} = getState();

    if (mistakes >= maxMistakes) {
      // TODO: Результат игры: проигрыш, закончились попытки
      return dispatch(restartGame());
    }
    if (questionIndex + 1 >= questions.length) {
      // TODO: Результат игры: выигрыш
      return dispatch(restartGame());
    }
    return dispatch({type: ActionsTypes.NextStep});
  };
};

/**
 * Обработать пользовательский ответ на игровой вопрос
 * @param {GameAnswer[]} answers Ответы пользователя на текущий вопрос
 * @return {AppActionTypes}
 */
export const handleAnswer = (answers: GameAnswer[]): AppThunkAction => {
  return (dispatch, getState) => {
    const {questions, questionIndex} = getState();
    const question = questions[questionIndex];
    const payload = {mistakes: 0};

    let isAnswersCorrect = false;

    // TODO: Можно ли обойтись без явного приведения типов и необходима ли проверка,
    // что переданн answer подходящий для текущего типа вопроса?
    switch (question.type) {
      case QuestionTypes.Artist:
        const [answer] = answers as ArtistAnswer[];
        isAnswersCorrect =
          (answers.length === 1) &&
          (question.song.artist === answer.artist);
        break;
      case QuestionTypes.Genre:
        const genreAnswers = question.answers
          .filter((it) => it.genre === question.genre);
        isAnswersCorrect = (answers as GenreAnswer[])
          .every((it) => question.genre === it.genre) &&
          (answers.length === genreAnswers.length);
        break;
    }

    payload.mistakes = +!isAnswersCorrect;

    dispatch({type: ActionsTypes.HandleAnswer, payload});
    dispatch(handleStep());
  };
};


export interface AppState {
  /** Набор вопросов */
  questions: GameQuestion[];
  /** Порядковый номер текущего вопроса */
  questionIndex: number;
  /** Количество допущенных ошибок */
  mistakes: number;
  /** Игровое время, мин */
  maxTime: number;
  /** Количество допустимых ошибок */
  maxMistakes: number;
}

export const initialState: AppState = {
  questions: Mocks.questions as GameQuestion[],
  questionIndex: -1,
  mistakes: 0,
  maxTime: 5,
  maxMistakes: 3,
};

export default (state = initialState, action: AppActionTypes): AppState => {
  switch (action.type) {
    case ActionsTypes.RestartGame:
      return initialState;
    case ActionsTypes.NextStep:
      return {...state, questionIndex: state.questionIndex + 1};
    case ActionsTypes.HandleAnswer:
      return {...state, mistakes: state.mistakes + action.payload.mistakes};
    default:
      return state;
  }
};
