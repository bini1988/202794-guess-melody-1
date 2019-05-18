import React from "react";

export interface SuccessScreenProps {
  /** Обработчик перезапуска игры */
  onRestart?: () => void;
}

const SuccessScreen = (props: SuccessScreenProps): JSX.Element => {
  const {onRestart} = props;

  return (
    <section className="result">
      <div className="result__logo">
        <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"/>
      </div>
      <h2 className="result__title">
        {`Вы настоящий меломан!`}
      </h2>
      <p className="result__total">
        {`За 3 минуты и 25 секунд вы набрали 12 баллов (8 быстрых), совершив 3 ошибки`}
      </p>
      <p className="result__text">
        {`Вы заняли 2 место из 10. Это лучше чем у 80% игроков`}
      </p>
      <button className="replay" type="button" onClick={onRestart}>
        {`Сыграть ещё раз`}
      </button>
    </section>
  );
};

export default SuccessScreen;
