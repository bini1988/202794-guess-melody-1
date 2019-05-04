import React from "react";
import renderer from "react-test-renderer";
import WelcomeScreen from "./welcome-screen.jsx";

it(`WelcomeScreen correctly renders default markup`, () => {
  const tree = renderer
    .create(
        <WelcomeScreen
          maxTime={5}
          maxMistakes={3}/>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
