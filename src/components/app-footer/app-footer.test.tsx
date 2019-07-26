import React from "react";
import renderer from "react-test-renderer";
import serializer from "jest-emotion";
import AppFooter from "./app-footer";

expect.addSnapshotSerializer(serializer);

it(`AppFooter correctly renders default markup`, () => {
  const tree = renderer.create(<AppFooter/>).toJSON();
  expect(tree).toMatchSnapshot();
});
