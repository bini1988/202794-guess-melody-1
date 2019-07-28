import React from "react";
import renderer from "react-test-renderer";
import serializer from "jest-emotion";
import AnswerLabel from "./answer-label";

expect.addSnapshotSerializer(serializer);

it(`AnswerLabel correctly renders default markup`, () => {
  const tree = renderer
    .create(
        <AnswerLabel
          text="label"/>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
