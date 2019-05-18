import React from "react";
import renderer from "react-test-renderer";
import ErrorModal from "./error-modal";


it(`ErrorModal correctly renders default markup`, () => {
  const tree = renderer
    .create(
        <ErrorModal/>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
