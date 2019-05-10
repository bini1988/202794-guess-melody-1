import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {TrackGenres} from "../../types.d";
import GenreQuestionScreen from "./genre-question-screen";

configure({adapter: new Adapter()});

describe(`GenreQuestionScreen`, () => {
  it(`should call onAnswer with user answer`, () => {
    const index = 10;
    const answersMock = [
      {src: ``, genre: TrackGenres.Rock},
      {src: ``, genre: TrackGenres.Jazz}
    ];
    const preventDefault = jest.fn();
    const hanleAnswer = jest.fn();
    const wrapper = mount(
        <GenreQuestionScreen
          index={index}
          genre={TrackGenres.Rock}
          answers={answersMock}
          onAnswer={hanleAnswer}/>
    );

    const gameForm = wrapper.find(`.game__tracks`);
    expect(gameForm).toHaveLength(1);

    gameForm.simulate(`submit`, {
      preventDefault,
      target: {
        elements: {
          namedItem: () => [
            {checked: true, value: TrackGenres.Rock},
            {checked: true, value: TrackGenres.Jazz},
          ]
        },
      }
    });
    expect(preventDefault).toHaveBeenCalledTimes(1);
    expect(hanleAnswer).toHaveBeenCalledWith({index, answer: [TrackGenres.Rock, TrackGenres.Jazz]});
  });
});
