import React from "react";
import renderer from "react-test-renderer";
import serializer from "jest-emotion";
import {ArtistQuestion} from "../../types.d";
import {artistQuestion} from "../../mocks/game";
import ArtistQuestionScreen from "./artist-question-screen";

expect.addSnapshotSerializer(serializer);

it(`ArtistQuestionScreen correctly renders default markup`, () => {
  const tree = renderer
    .create(
        <ArtistQuestionScreen
          question={artistQuestion as ArtistQuestion}/>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
