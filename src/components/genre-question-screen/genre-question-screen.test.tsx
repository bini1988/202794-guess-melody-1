import React from "react";
import renderer from "react-test-renderer";
import serializer from "jest-emotion";
import {GenreQuestion} from "../../types.d";
import {genreQuestion} from "../../mocks/game";
import GenreQuestionScreen from "./genre-question-screen";

expect.addSnapshotSerializer(serializer);

it(`GenreQuestionScreen correctly renders default markup`, () => {
  const tree = renderer
    .create(
        <GenreQuestionScreen
          question={genreQuestion as GenreQuestion}/>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
