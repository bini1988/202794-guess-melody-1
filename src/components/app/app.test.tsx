import React from "react";
import renderer from "react-test-renderer";
import serializer from "jest-emotion";
import {questions} from "../../mocks/game";
import {GameQuestion} from "../../types.d";
import {App} from "./app";

expect.addSnapshotSerializer(serializer);

it(`App correctly renders default markup`, () => {
  const tree = renderer
    .create(
        <App
          maxTime={5}
          maxMistakes={3}
          mistakes={0}
          questions={questions as GameQuestion[]}
          questionIndex={0}
          handleStep={() => {}}
          handleAnswer={() => {}}/>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});

it(`App correctly renders genre question markup`, () => {
  const tree = renderer
    .create(
        <App
          maxTime={5}
          maxMistakes={3}
          mistakes={0}
          questions={questions as GameQuestion[]}
          questionIndex={1}
          handleStep={() => {}}
          handleAnswer={() => {}}/>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});

it(`App correctly renders artist question markup`, () => {
  const tree = renderer
    .create(
        <App
          maxTime={5}
          maxMistakes={3}
          mistakes={0}
          questions={questions as GameQuestion[]}
          questionIndex={1}
          handleStep={() => {}}
          handleAnswer={() => {}}/>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
