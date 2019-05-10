import React from "react";
import renderer from "react-test-renderer";
import {TrackGenres} from "../../types.d";
import GenreQuestionScreen from "./genre-question-screen";

it(`GenreQuestionScreen correctly renders default markup`, () => {
  const answersMock = [
    {src: ``, genre: TrackGenres.Rock},
    {src: ``, genre: TrackGenres.Jazz}
  ];

  const tree = renderer
    .create(
        <GenreQuestionScreen
          index={0}
          genre={TrackGenres.Rock}
          answers={answersMock}/>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
