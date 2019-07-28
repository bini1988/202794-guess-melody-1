/* eslint-disable no-invalid-this */
import {observable, action, flow} from "mobx";
import axios from "../axios";
import {ArtistAnswer, GenreAnswer, QuestionTypes, GameQuestion} from "../types.d";
import {questions} from "../mocks/game";

class Game {
  @observable public fetching: boolean = false;
  @observable public error = null;

  @observable public maxTime: number = 5;
  @observable public maxMistakes: number = 3;
  @observable public questions: GameQuestion[] = questions as GameQuestion[];
  @observable public questionIndex: number = 0;
  @observable public answers = [];
  @observable public mistakes: number = 5;
  @observable public time: number = 0;

  @action.bound
  public restart() {
    this.questionIndex = -1;
    this.mistakes = 0;
    this.time = 0;
  }

  @action.bound
  public handleStep() {
    if (this.mistakes >= this.maxMistakes) {
      this.restart();
    }
  }

  @action.bound
  public handleArtistAnswer(answer: ArtistAnswer, time: number) {
    const question = this.questions[this.questionIndex];

    if (question.type === QuestionTypes.Artist) {
      const isAnswerCorrect =
        (question.song.artist === answer.artist);

      this.handleAnswer(isAnswerCorrect, time);
    }
  }

  @action.bound
  public handleGenreAnswer(answers: GenreAnswer[], time: number) {
    const question = this.questions[this.questionIndex];

    if (question.type === QuestionTypes.Genre) {
      const byGenre = (it: GenreAnswer) => it.genre === question.genre;
      const answersCount = question.answers.filter(byGenre).length;
      const isGenresCorrect = answers.every(byGenre);
      const isAnswersCorrect =
        isGenresCorrect && (answers.length === answersCount);

      this.handleAnswer(isAnswersCorrect, time);
    }
  }

  @action.bound
  public fetchQuestions = flow(function* (this: Game) {
    this.fetching = true;
    this.error = null;

    try {
      const responce = yield axios.get(`/questions`);
      this.questions = responce.data;
    } catch (error) {
      this.error = error;
    } finally {
      this.fetching = false;
    }
  })

  @action
  private handleAnswer(isCorrect: boolean, time: number) {
    this.mistakes += +!isCorrect;
    this.time += time;
  }
}

export {Game};
export default new Game();
