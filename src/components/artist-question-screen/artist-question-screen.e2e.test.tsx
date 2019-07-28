import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import serializer from "jest-emotion";
import {QuestionTypes, GameQuestion} from "../../types.d";
import ArtistQuestionScreen, {ArtistForm} from "./artist-question-screen";

expect.addSnapshotSerializer(serializer);
configure({adapter: new Adapter()});

describe(`ArtistQuestionScreen`, () => {
  it(`should call onAnswer with user answer`, () => {
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
    const answer = questionMock.answers[answerIndex];
    const hanleAnswer = jest.fn();
    const wrapper = mount(
        <ArtistQuestionScreen
          question={questionMock}
          onAnswer={hanleAnswer}/>
    );

    const form = wrapper.find(ArtistForm);
    expect(form).toHaveLength(1);

    const formAnswer = form.find(`input#artist-${answerIndex}`);
    expect(formAnswer).toHaveLength(1);

    formAnswer.simulate(`change`);

    expect(hanleAnswer).toHaveBeenCalledTimes(1);
    expect(hanleAnswer).toHaveBeenCalledWith([answer]);
  });
});
