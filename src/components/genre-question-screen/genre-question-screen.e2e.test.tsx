import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {QuestionTypes, TrackGenres, GameQuestion} from "../../types.d";
import GenreQuestionScreen from "./genre-question-screen";

configure({adapter: new Adapter()});

describe(`GenreQuestionScreen`, () => {
  it(`should call onAnswer with user answer`, () => {
    const index = 10;
    const questionMock: GameQuestion = {
      type: QuestionTypes.Genre,
      genre: TrackGenres.Rock,
      answers: [
        {src: ``, genre: TrackGenres.Rock},
        {src: ``, genre: TrackGenres.Jazz}
      ]
    };
    const preventDefault = jest.fn();
    const hanleAnswer = jest.fn();
    const wrapper = mount(
        <GenreQuestionScreen
          index={index}
          question={questionMock}
          onAnswer={hanleAnswer}/>
    );

    const gameForm = wrapper.find(`.game__tracks`);
    expect(gameForm).toHaveLength(1);

    questionMock.answers.forEach((it, itIndex) => {
      const gameInput = gameForm.find(`.game__input[id='answer-${itIndex}']`);
      expect(gameInput).toHaveLength(1);

      gameInput.simulate(`change`);
    });

    gameForm.simulate(`submit`, {preventDefault});

    expect(preventDefault).toHaveBeenCalledTimes(1);
    expect(hanleAnswer).toHaveBeenCalledWith({
      index, answer: questionMock.answers.map((it) => it.genre)
    });
  });
});
