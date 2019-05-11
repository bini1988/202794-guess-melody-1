import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app";
import {maxTime, maxMistakes, questions} from "./mocks/game";

ReactDOM.render(
    <App
      maxTime={maxTime}
      maxMistakes={maxMistakes}
      questions={questions}/>,
    document.querySelector(`.main`)
);
