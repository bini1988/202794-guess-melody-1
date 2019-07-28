import React from "react";
import renderer from "react-test-renderer";
import serializer from "jest-emotion";
import AudioPlayer from "./audio-player";

expect.addSnapshotSerializer(serializer);

it(`AudioPlayer correctly renders default markup`, () => {
  const tree = renderer
    .create(
        <AudioPlayer
          src=""/>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
