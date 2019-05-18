import React from "react";
import renderer from "react-test-renderer";
import {QuestionTypes, GameQuestion} from "../../types.d";
import ArtistQuestionScreen from "./artist-question-screen";

const questionMock: GameQuestion = {
  type: QuestionTypes.Artist,
  song: {artist: `artist#1`, src: ``},
  answers: [
    {picture: ``, artist: `artist#1`},
    {picture: ``, artist: `artist#2`},
    {picture: ``, artist: `artist#3`},
  ]
};

it(`ArtistQuestionScreen correctly renders default markup`, () => {
  const tree = renderer
    .create(
        <ArtistQuestionScreen
          question={questionMock}/>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
