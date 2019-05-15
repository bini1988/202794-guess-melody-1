import React from "react";
import renderer from "react-test-renderer";
import AudioPlayer from "./audio-player";

it(`AudioPlayer correctly renders default markup`, () => {
  const tree = renderer
    .create(
        <AudioPlayer
          src=""/>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
