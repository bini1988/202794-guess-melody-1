import React from "react";
import renderer from "react-test-renderer";
import serializer from "jest-emotion";
import TimerProgress from "./timer-progress";

expect.addSnapshotSerializer(serializer);

it(`TimerProgress correctly renders default markup`, () => {
  const tree = renderer
    .create(
        <TimerProgress
          progress={50}/>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
