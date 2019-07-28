import {inject} from "mobx-react";
import {IStores} from "../../models";
import WelcomeScreenView from "./welcome-screen";

const enhancer = inject((stores: IStores) => ({
  maxTime: stores.game.maxTime,
  maxMistakes: stores.game.maxMistakes,
  fetching: stores.game.fetching,
  fetchQuestions: stores.game.fetchQuestions
}));

export {WelcomeScreenView};
export default enhancer(WelcomeScreenView);
