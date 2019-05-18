import React from "react";

export interface GameMistakesProps {
  /** Количество совершенных ошибок */
  mistakes: number;
}

const GameMistakes = (props: GameMistakesProps): JSX.Element => {
  const {mistakes} = props;

  return (
    <div className="game__mistakes">
      {Array.from(new Array(mistakes)).map((it, index) => (
        <div key={index} className="wrong"/>
      ))}
    </div>
  );
};

export default GameMistakes;
