import React from "react";
import renderer from "react-test-renderer";
import SuccessScreen from "./success-screen";


it(`SuccessScreen correctly renders default markup`, () => {
  const tree = renderer
    .create(
        <SuccessScreen
          onRestart={() => {}}/>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
