import React from "react";
import renderer from "react-test-renderer";
import serializer from "jest-emotion";
import WelcomeScreen from "./welcome-screen";

expect.addSnapshotSerializer(serializer);

it(`WelcomeScreen correctly renders default markup`, () => {
  const tree = renderer
    .create(
        <WelcomeScreen
          maxTime={5}
          maxMistakes={3}/>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
