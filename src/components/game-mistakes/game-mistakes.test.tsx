import React from "react";
import renderer from "react-test-renderer";
import GameMistakes from "./game-mistakes";


it(`GameMistakes correctly renders default markup`, () => {
  const tree = renderer
    .create(
        <GameMistakes mistakes={2}/>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
