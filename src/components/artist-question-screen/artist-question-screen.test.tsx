import React from "react";
import renderer from "react-test-renderer";
import ArtistQuestionScreen from "./artist-question-screen";

it(`ArtistQuestionScreen correctly renders default markup`, () => {
  const songMock = {artist: `artist#1`, src: ``};
  const answersMock = [
    {picture: ``, artist: `artist#1`},
    {picture: ``, artist: `artist#2`},
    {picture: ``, artist: `artist#3`},
  ];

  const tree = renderer
    .create(
        <ArtistQuestionScreen
          index={0}
          song={songMock}
          answers={answersMock}/>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
