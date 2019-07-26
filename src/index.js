import "regenerator-runtime/runtime";

import React from "react";
import ReactDOM from "react-dom";
import {configure} from "mobx";
import {Provider} from "mobx-react";

import App from "./components/app";
import stores from "./models";

configure({enforceActions: `observed`});

ReactDOM.render(
    <Provider {...stores}>
      <App/>
    </Provider>,
    document.getElementById(`app`)
);
