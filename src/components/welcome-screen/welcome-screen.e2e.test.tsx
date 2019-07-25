import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import WelcomeScreen, {Button} from "./welcome-screen";

configure({adapter: new Adapter()});

describe(`WelcomeScreen`, () => {
  it(`should call onBeginClick on mouse click`, () => {
    const btnClickHandler = jest.fn();
    const wrapper = shallow(
        <WelcomeScreen
          maxTime={5}
          maxMistakes={3}
          onBeginClick={btnClickHandler}/>
    );

    const btn = wrapper.find(Button);
    expect(btn).toHaveLength(1);

    btn.simulate(`click`);
    expect(btnClickHandler).toHaveBeenCalledTimes(1);
  });
});
