import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {QuestionTypes, GameQuestion} from "../../types.d";
import ArtistQuestionScreen from "./artist-question-screen";

configure({adapter: new Adapter()});

describe(`ArtistQuestionScreen`, () => {
  it(`should call onAnswer with user answer`, () => {
    const index = 10;
    const answerIndex = 1;
    const questionMock: GameQuestion = {
      type: QuestionTypes.Artist,
      song: {artist: `artist#1`, src: ``},
      answers: [
        {picture: ``, artist: `artist#1`},
        {picture: ``, artist: `artist#2`},
        {picture: ``, artist: `artist#3`},
      ]
    };
    const answer = questionMock.answers[answerIndex].artist;
    const hanleAnswer = jest.fn();
    const wrapper = mount(
        <ArtistQuestionScreen
          index={index}
          question={questionMock}
          onAnswer={hanleAnswer}/>
    );

    const gameForm = wrapper.find(`.game__artist`);
    expect(gameForm).toHaveLength(1);

    const gameAnswer = gameForm.find(`#artist-${answerIndex}`);
    expect(gameAnswer).toHaveLength(1);
    const value = gameAnswer.prop(`value`);

    gameForm.simulate(`change`, {target: {value}});

    expect(hanleAnswer).toHaveBeenCalledTimes(1);
    expect(hanleAnswer).toHaveBeenCalledWith({index, answer});
  });
});