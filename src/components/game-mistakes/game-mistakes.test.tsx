import React from "react";
import renderer from "react-test-renderer";
import serializer from "jest-emotion";
import GameMistakes from "./game-mistakes";

expect.addSnapshotSerializer(serializer);

it(`GameMistakes correctly renders default markup`, () => {
  const tree = renderer
    .create(
        <GameMistakes mistakes={2}/>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
