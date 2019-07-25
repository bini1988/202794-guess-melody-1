import React from "react";
import renderer from "react-test-renderer";
import serializer from "jest-emotion";
import GameFooter from "./game-footer";

expect.addSnapshotSerializer(serializer);

it(`GameFooter correctly renders default markup`, () => {
  const tree = renderer.create(<GameFooter/>).toJSON();
  expect(tree).toMatchSnapshot();
});
