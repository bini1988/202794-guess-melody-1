import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import App from "./app";
import {TrackGenres, QuestionTypes, GameQuestion} from "../../types.d";

configure({adapter: new Adapter()});

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
  }, {
    type: QuestionTypes.Genre,
    genre: TrackGenres.Jazz,
    answers: [
      {src: `src#1`, genre: TrackGenres.Rock},
      {src: `src#2`, genre: TrackGenres.Jazz},
    ]
  }
];

describe(`App`, () => {
  it(`On click on WelcomeScreen App switches to the first question`, () => {
    const wrapper = mount(
        <App
          maxTime={5}
          maxMistakes={3}
          questions={questionsMock}/>
    );

    const btn = wrapper.find(`.welcome__button`);
    expect(btn).toHaveLength(1);

    btn.simulate(`click`);
    wrapper.update();

    expect(wrapper.state(`questionIndex`)).toEqual(0);

    const gameWrapper = wrapper.find(`.game`);
    expect(gameWrapper).toHaveLength(1);

    const gameTitle = gameWrapper.find(`.game__title`);
    expect(gameTitle).toHaveLength(1);
    expect(gameTitle.text().includes(TrackGenres.Rock)).toBeTruthy();
  });
  it(`Genre question answer switches to another question`, () => {
    const preventDefault = jest.fn();
    const wrapper = mount(
        <App
          maxTime={5}
          maxMistakes={3}
          questions={questionsMock}/>
    );

    wrapper.setState({questionIndex: 0});
    wrapper.update();

    const gameWrapper = wrapper.find(`.game`);
    expect(gameWrapper).toHaveLength(1);
    expect(gameWrapper.hasClass(`game--genre`)).toBeTruthy();

    const gameForm = gameWrapper.find(`.game__tracks`);
    expect(gameForm).toHaveLength(1);

    gameForm.simulate(`submit`, {preventDefault});
    expect(wrapper.state(`questionIndex`)).toEqual(1);
    expect(preventDefault).toHaveBeenCalledTimes(1);
  });
  it(`Artist question answer switches to another question`, () => {
    const wrapper = mount(
        <App
          maxTime={5}
          maxMistakes={3}
          questions={questionsMock}/>
    );

    wrapper.setState({questionIndex: 1});
    wrapper.update();

    const gameWrapper = wrapper.find(`.game`);
    expect(gameWrapper).toHaveLength(1);
    expect(gameWrapper.hasClass(`game--artist`)).toBeTruthy();

    const gameForm = gameWrapper.find(`.game__artist`);
    expect(gameForm).toHaveLength(1);

    gameForm.simulate(`change`);
    expect(wrapper.state(`questionIndex`)).toEqual(2);
  });
  it(`Last question answer leads to the first screen`, () => {
    const preventDefault = jest.fn();
    const wrapper = mount(
        <App
          maxTime={5}
          maxMistakes={3}
          questions={questionsMock}/>
    );

    wrapper.setState({questionIndex: 2});
    wrapper.update();

    const gameWrapper = wrapper.find(`.game`);
    expect(gameWrapper).toHaveLength(1);
    expect(gameWrapper.hasClass(`game--genre`)).toBeTruthy();

    const gameForm = gameWrapper.find(`.game__tracks`);
    expect(gameForm).toHaveLength(1);

    gameForm.simulate(`submit`, {preventDefault});
    expect(wrapper.state(`questionIndex`)).toEqual(-1);
    expect(preventDefault).toHaveBeenCalledTimes(1);
  });
});
