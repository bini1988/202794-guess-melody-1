import React from "react";
import renderer from "react-test-renderer";
import {TrackGenres, QuestionTypes, GameQuestion} from "../../types.d";
import {App} from "./app";

const questionsMock: GameQuestion[] = [
  {
    type: QuestionTypes.Genre,
    genre: TrackGenres.Rock,
    answers: [
      {src: `src#1`, genre: TrackGenres.Rock},
      {src: `src#2`, genre: TrackGenres.Jazz},
    ]
  }, {
    type: QuestionTypes.Artist,
    song: {artist: `artist#1`, src: `src#1`},
    answers: [
      {picture: `picture#1`, artist: `artist#1`},
      {picture: `picture#2`, artist: `artist#2`},
    ]
  }
];

it(`App correctly renders default markup`, () => {
  const tree = renderer
    .create(
        <App
          maxTime={5}
          maxMistakes={3}
          mistakes={0}
          questions={questionsMock}
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
          questions={questionsMock}
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
          questions={questionsMock}
          questionIndex={1}
          handleStep={() => {}}
          handleAnswer={() => {}}/>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
