import React from "react";
import renderer from "react-test-renderer";
import {QuestionTypes, TrackGenres} from "../../types.d";
import GenreQuestionScreen from "./genre-question-screen";

it(`GenreQuestionScreen correctly renders default markup`, () => {
  const questionMock = {
    type: QuestionTypes.Genre,
    genre: TrackGenres.Rock,
    answers: [
      {src: ``, genre: TrackGenres.Rock},
      {src: ``, genre: TrackGenres.Jazz}
    ]
  };

  const tree = renderer
    .create(
        <GenreQuestionScreen
          index={0}
          question={questionMock}/>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
