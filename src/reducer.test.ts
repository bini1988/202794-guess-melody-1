import {ArtistQuestion, GenreQuestion, GameQuestion, QuestionTypes} from "./types.d";
import reducer, {initialState, ActionsTypes, HandleAnswerAction, NextStepAction, restartGame, handleStep, handleAnswer} from "./reducer";
import {questions} from "./mocks/game";

describe(`App Reducer`, () => {
  it(`should correctly reset application state by RestartGame`, () => {
    const state = {...initialState, questionIndex: 6, mistakes: 3};
    const action = restartGame();

    expect(reducer(state, action)).toEqual(initialState);
  });
  it(`should correctly update state by HandleAnswer`, () => {
    const state = {...initialState};
    const mistakes = 5;
    const action: HandleAnswerAction = {type: ActionsTypes.HandleAnswer, payload: {mistakes}};

    expect(reducer(state, action)).toEqual({...initialState, mistakes});
  });
  it(`should correctly update state by NextStep`, () => {
    const state = {...initialState};
    const action: NextStepAction = {type: ActionsTypes.NextStep};

    // TODO: Есть ли смысл в таком тесте?
    expect(reducer(state, action)).toEqual({
      ...initialState, questionIndex: initialState.questionIndex + 1
    });
  });
  it(`should handle next game step by handleStep`, () => {
    const state = {...initialState};
    const dispatch = jest.fn();

    handleStep()(dispatch, () => state, null);

    expect(dispatch).toBeCalledWith({type: ActionsTypes.NextStep});
  });
  it(`should handle restart game by handleStep if mistakes are exceeded`, () => {
    const state = {...initialState, mistakes: initialState.maxMistakes + 1};
    const dispatch = jest.fn();

    handleStep()(dispatch, () => state, null);

    expect(dispatch).toBeCalledWith(restartGame());
  });
  it(`should handle restart game by handleStep if questions are done`, () => {
    const state = {...initialState, questionIndex: initialState.questions.length};
    const dispatch = jest.fn();

    handleStep()(dispatch, () => state, null);

    expect(dispatch).toBeCalledWith(restartGame());
  });
  it(`should handle wrong user answer on ArtistQuestion by handleAnswer`, () => {
    const questionIndex = 0;
    const state = {
      ...initialState, questionIndex, questions: questions as GameQuestion[]
    };
    const question = questions[questionIndex] as ArtistQuestion;
    const mockAnswers = [question.answers[0]];
    const dispatch = jest.fn();
    const payload = {mistakes: 1};

    handleAnswer(mockAnswers)(dispatch, () => state, null);

    expect(question.type).toEqual(QuestionTypes.Artist);
    expect(dispatch).toBeCalledWith({type: ActionsTypes.HandleAnswer, payload});
  });
  it(`should handle correct user answer on ArtistQuestion by handleAnswer`, () => {
    const questionIndex = 0;
    const state = {
      ...initialState, questionIndex, questions: questions as GameQuestion[]
    };
    const question = questions[questionIndex] as ArtistQuestion;
    const mockAnswers = [question.answers[2]];
    const dispatch = jest.fn();
    const payload = {mistakes: 0};

    handleAnswer(mockAnswers)(dispatch, () => state, null);

    expect(question.type).toEqual(QuestionTypes.Artist);
    expect(dispatch).toBeCalledWith({type: ActionsTypes.HandleAnswer, payload});
  });
  it(`should handle wrong user answer on GenreQuestion by handleAnswer`, () => {
    const questionIndex = 1;
    const state = {
      ...initialState, questionIndex, questions: questions as GameQuestion[]
    };
    const question = questions[questionIndex] as GenreQuestion;
    const mockAnswers = question.answers;
    const dispatch = jest.fn();
    const payload = {mistakes: 1};

    handleAnswer(mockAnswers)(dispatch, () => state, null);

    expect(question.type).toEqual(QuestionTypes.Genre);
    expect(dispatch).toBeCalledWith({type: ActionsTypes.HandleAnswer, payload});
  });
  it(`should handle incomplete user answer on GenreQuestion by handleAnswer`, () => {
    const questionIndex = 1;
    const state = {
      ...initialState, questionIndex, questions: questions as GameQuestion[]
    };
    const question = questions[questionIndex] as GenreQuestion;
    const answers = question.answers.filter((it) => it.genre === question.genre);
    const mockAnswers = [answers[0]];
    const dispatch = jest.fn();
    const payload = {mistakes: 1};

    handleAnswer(mockAnswers)(dispatch, () => state, null);

    expect(answers.length).toBeGreaterThan(1);
    expect(question.type).toEqual(QuestionTypes.Genre);
    expect(dispatch).toBeCalledWith({type: ActionsTypes.HandleAnswer, payload});
  });
  it(`should handle correct user answer on GenreQuestion by handleAnswer`, () => {
    const questionIndex = 1;
    const state = {
      ...initialState, questionIndex, questions: questions as GameQuestion[]
    };
    const question = questions[questionIndex] as GenreQuestion;
    const mockAnswers = question.answers.filter((it) => it.genre === question.genre);
    const dispatch = jest.fn();
    const payload = {mistakes: 0};

    handleAnswer(mockAnswers)(dispatch, () => state, null);

    expect(question.type).toEqual(QuestionTypes.Genre);
    expect(dispatch).toBeCalledWith({type: ActionsTypes.HandleAnswer, payload});
  });
});
