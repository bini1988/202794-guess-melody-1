import React from "react";
import ReactDOM from "react-dom";
import {createStore} from "redux";
import {Provider} from "react-redux";

import reducer from "./reducer";
import App from "./components/app/app";
import {maxTime, maxMistakes, questions} from "./mocks/game";

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

ReactDOM.render(
    <Provider store={store}>
      <App
        maxTime={maxTime}
        maxMistakes={maxMistakes}
        questions={questions}/>
    </Provider>,
    document.querySelector(`.main`)
);
