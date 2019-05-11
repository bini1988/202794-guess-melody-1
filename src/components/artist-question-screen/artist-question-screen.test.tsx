import React from "react";
import renderer from "react-test-renderer";
import {QuestionTypes} from "../../types.d";
import ArtistQuestionScreen from "./artist-question-screen";

it(`ArtistQuestionScreen correctly renders default markup`, () => {
  const questionMock = {
    type: QuestionTypes.Artist,
    song: {artist: `artist#1`, src: ``},
    answers: [
      {picture: ``, artist: `artist#1`},
      {picture: ``, artist: `artist#2`},
      {picture: ``, artist: `artist#3`},
    ]
  };

  const tree = renderer
    .create(
        <ArtistQuestionScreen
          index={0}
          question={questionMock}/>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
