/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import AudioPlayer from "../../components/audio-player/audio-player";
import withActivePlayer from "./with-active-player";

configure({adapter: new Adapter()});


describe(`GenreQuestionScreen`, () => {
  it(`should return AudioPlayer component on renderPlayer method call`, () => {
    const index = 0;
    const src = `trailer`;

    function MockComponent(props) {
      return props.renderPlayer(index, {src});
    }

    const WrappedMockComponent = withActivePlayer(MockComponent);
    const wrapper = mount(
        <WrappedMockComponent/>
    );

    const renderWrapper = wrapper.find(MockComponent)
      .renderProp(`renderPlayer`)(index, {src});
    const playerWrapper = renderWrapper.children();

    expect(playerWrapper.type()).toEqual(AudioPlayer);
    expect(playerWrapper.props()).toMatchObject({src});
  });
  it(`should switch active player index`, () => {
    HTMLMediaElement.prototype.play = jest.fn();
    HTMLMediaElement.prototype.pause = jest.fn();

    const sources = [`src#1`, `src#2`];

    function MockComponent(props) {
      return sources.map(
          (src, index) => props.renderPlayer(index, {src})
      );
    }

    const WrappedMockComponent = withActivePlayer(MockComponent);
    const wrapper = mount(
        <WrappedMockComponent/>
    );

    let component = null;

    component = wrapper.find(MockComponent);
    expect(component.prop(`activeIndex`)).toEqual(-1);

    let audioWrapper = null;

    for (let audioIndex = 0; audioIndex < sources.length; audioIndex++) {
      audioWrapper = wrapper.find(`AudioPlayer`).at(audioIndex);
      const audioWrapperProps = audioWrapper.props();

      expect(audioWrapperProps).toHaveProperty(`onPlay`);

      (audioWrapper as any).prop(`onPlay`)();
      wrapper.update();

      component = wrapper.find(MockComponent);
      expect(component.prop(`activeIndex`)).toEqual(audioIndex);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (audioWrapper as any).prop(`onPause`)();
    wrapper.update();

    component = wrapper.find(MockComponent);
    expect(component.prop(`activeIndex`)).toEqual(-1);
  });
});
