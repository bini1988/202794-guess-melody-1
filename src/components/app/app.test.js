import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

it(`App correctly renders default markup`, () => {
  const tree = renderer
    .create(
        <App/>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
