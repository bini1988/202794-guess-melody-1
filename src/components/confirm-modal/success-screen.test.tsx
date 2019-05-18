import React from "react";
import renderer from "react-test-renderer";
import ConfirmModal from "./confirm-modal";


it(`ConfirmModal correctly renders default markup`, () => {
  const tree = renderer
    .create(
        <ConfirmModal
          onConfirm={() => {}}
          onCancel={() => {}}/>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
