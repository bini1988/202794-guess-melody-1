import React from "react";
import renderer from "react-test-renderer";
import {QuestionTypes, TrackGenres, GameQuestion} from "../../types.d";
import GenreQuestionScreen from "./genre-question-screen";

const questionMock: GameQuestion = {
  type: QuestionTypes.Genre,
  genre: TrackGenres.Rock,
  answers: [
    {src: ``, genre: TrackGenres.Rock},
    {src: ``, genre: TrackGenres.Jazz}
  ]
};

it(`GenreQuestionScreen correctly renders default markup`, () => {
  const tree = renderer
    .create(
        <GenreQuestionScreen
          index={0}
          question={questionMock}/>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
