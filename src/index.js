import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app";
import questions from "./mocks/questions";
import {maxTime, maxMistakes} from "./mocks/settings";

ReactDOM.render(
    <App
      maxTime={maxTime}
      maxMistakes={maxMistakes}
      questions={questions}/>,
    document.querySelector(`.main`)
);
