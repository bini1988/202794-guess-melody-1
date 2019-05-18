
export const MAKE_MISTAKE: string = `MAKE_MISTAKE`;
export const NEXT_QUESTION: string = `NEXT_QUESTION`;

export interface MakeMistakeAction {
  type: typeof MAKE_MISTAKE;
}

export interface NextQuestionAction {
  type: typeof NEXT_QUESTION;
  payload: number;
}

export type AppActionTypes = MakeMistakeAction | NextQuestionAction

export interface AppState {
  /** Порядковый номер текущего вопроса */
  questionIndex: number;
  /** Количество допущенных ошибок */
  mistakes: number;
}

export const initialState: AppState = {
  questionIndex: -1,
  mistakes: 5,
};

export default (state: AppState = initialState, action: AppActionTypes): AppState => {
  switch (action.type) {
    default:
      return state;
  }
};
