import React from "react";
import renderer from "react-test-renderer";
import FailScreen from "./fail-screen";


it(`FailScreen correctly renders default markup`, () => {
  const tree = renderer
    .create(
        <FailScreen
          title="FailTitle"
          message="FailMessage"
          onRestart={() => {}}/>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
