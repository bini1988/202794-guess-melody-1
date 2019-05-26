import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {QuestionTypes, TrackGenres, GameQuestion} from "../../types.d";
import GenreQuestionScreen from "./genre-question-screen";

configure({adapter: new Adapter()});

describe(`GenreQuestionScreen`, () => {
  it(`should call onAnswer with user answer`, () => {
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
    expect(hanleAnswer).toHaveBeenCalledWith(questionMock.answers);
  });
  it(`should switch active player index`, () => {
    HTMLMediaElement.prototype.play = jest.fn();
    HTMLMediaElement.prototype.pause = jest.fn();

    const index = 10;
    const questionMock: GameQuestion = {
      type: QuestionTypes.Genre,
      genre: TrackGenres.Rock,
      answers: [
        {src: `src#1`, genre: TrackGenres.Rock},
        {src: `src#2`, genre: TrackGenres.Jazz}
      ]
    };
    const hanleAnswer = jest.fn();
    const wrapper = mount(
        <GenreQuestionScreen
          index={index}
          question={questionMock}
          onAnswer={hanleAnswer}/>
    );

    let audioWrapper = null;

    for (let audioIndex = 0; audioIndex < questionMock.answers.length; audioIndex++) {
      audioWrapper = wrapper.find(`AudioPlayer`).at(audioIndex);
      const audioWrapperProps = audioWrapper.props();

      expect(audioWrapperProps).toHaveProperty(`onPlay`);
      expect(audioWrapperProps).toHaveProperty(`onPause`);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (audioWrapper as any).prop(`onPlay`)();

      expect(wrapper.state(`activePlayerIndex`)).toEqual(audioIndex);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (audioWrapper as any).prop(`onPause`)();

    expect(wrapper.state(`activePlayerIndex`)).toEqual(-1);
  });
});
