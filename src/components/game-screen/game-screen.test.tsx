import React from "react";
import renderer from "react-test-renderer";
import GameScreen from "./game-screen";
import {TrackGenres, QuestionTypes, GameQuestion} from "../../types.d";

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

it(`GameScreen correctly renders default markup`, () => {
  const handleAnswer = () => {};

  const tree = renderer
    .create(
        <GameScreen
          questions={questionsMock}
          questionIndex={0}
          time={5}
          mistakes={3}
          onAnswer={handleAnswer}/>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
