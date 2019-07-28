import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import AudioPlayer, {AudioButton} from "./audio-player";

configure({adapter: new Adapter()});

describe(`AudioPlayer`, () => {
  it(`should call onPlay and onPause on controlled mode`, () => {
    HTMLMediaElement.prototype.play = jest.fn();
    HTMLMediaElement.prototype.pause = jest.fn();

    const hanlePlay = jest.fn();
    const hanlePause = jest.fn();
    const wrapper = mount(
        <AudioPlayer
          src=""
          isPlaying={false}
          onPlay={hanlePlay}
          onPause={hanlePause}/>
    );

    const button = wrapper.find(AudioButton);
    button.simulate(`click`);

    expect(hanlePlay).toBeCalledWith(wrapper.instance());

    wrapper.setProps({isPlaying: true});
    button.simulate(`click`);

    expect(hanlePause).toBeCalledWith(wrapper.instance());
  });
  it(`should call play and pause on isPlaying prop change`, () => {
    const hanlePlay = jest.fn();
    const hanlePause = jest.fn();

    const wrapper = mount(
        <AudioPlayer src=""/>
    );

    HTMLMediaElement.prototype.play = hanlePlay;
    HTMLMediaElement.prototype.pause = hanlePause;

    wrapper.setProps({isPlaying: true});
    expect(hanlePlay).toBeCalledTimes(1);

    wrapper.setProps({isPlaying: false});
    expect(hanlePause).toBeCalledTimes(1);
  });
  it(`should change isPlaying state on uncontrolled mode`, () => {
    const hanlePlay = jest.fn();
    const hanlePause = jest.fn();

    HTMLMediaElement.prototype.play = hanlePlay;
    HTMLMediaElement.prototype.pause = hanlePause;

    const wrapper = mount(
        <AudioPlayer src=""/>
    );

    const button = wrapper.find(AudioButton);
    button.simulate(`click`);

    expect(wrapper.state(`isPlaying`)).toEqual(true);
    expect(hanlePlay).toBeCalled();

    button.simulate(`click`);

    expect(wrapper.state(`isPlaying`)).toEqual(false);
    expect(hanlePause).toBeCalled();
  });
});
