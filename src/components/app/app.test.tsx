import React from "react";
import renderer from "react-test-renderer";
import {TrackGenres, QuestionTypes} from "../../types.d";
import App from "./app";

it(`App correctly renders default markup`, () => {
  const questionsMock = [
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
  const tree = renderer
    .create(
        <App
          maxTime={5}
          maxMistakes={3}
          questions={questionsMock}/>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
