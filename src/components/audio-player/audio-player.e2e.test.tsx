import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import AudioPlayer from "./audio-player";

configure({adapter: new Adapter()});

describe(`AudioPlayer`, () => {
  it(`should call onPlay on controlled mode`, () => {
    const hanlePlay = jest.fn();
    const wrapper = mount(
        <AudioPlayer
          src=""
          isPlaying={false}
          onPlay={hanlePlay}/>
    );

    const button = wrapper.find(`.track__button`);
    button.simulate(`click`);

    expect(hanlePlay).toBeCalledWith(wrapper.instance());
  });
  it(`should call onPause on controlled mode`, () => {
    const hanlePause = jest.fn();
    const wrapper = mount(
        <AudioPlayer
          src=""
          isPlaying={true}
          onPause={hanlePause}/>
    );

    const button = wrapper.find(`.track__button`);
    button.simulate(`click`);

    expect(hanlePause).toBeCalledWith(wrapper.instance());
  });
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

    const button = wrapper.find(`.track__button`);
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
    const wrapper = mount(
        <AudioPlayer src=""/>
    );

    const button = wrapper.find(`.track__button`);
    button.simulate(`click`);

    expect(wrapper.state(`isPlaying`)).toEqual(true);

    button.simulate(`click`);

    expect(wrapper.state(`isPlaying`)).toEqual(false);
  });
});
