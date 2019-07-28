import {inject} from "mobx-react";
import {IStores} from "../../models";
import GameScreenView from "./game-screen";

const enhancer = inject((stores: IStores) => ({
  questions: stores.game.questions,
  questionIndex: stores.game.questionIndex,
  mistakes: stores.game.mistakes,
  fetchQuestions: stores.game.fetchQuestions
}));

export {GameScreenView};
export default enhancer(GameScreenView);
