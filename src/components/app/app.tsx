import React from "react";
import WelcomeScreen from "../welcome-screen/welcome-screen";

const App = (): JSX.Element => (
  <WelcomeScreen
    maxTime={5}
    maxMistakes={3}/>
);

export default App;
