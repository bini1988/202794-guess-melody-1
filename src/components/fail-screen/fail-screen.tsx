import React from "react";

export interface FailScreenProps {
  /** Заголовок сообщения */
  title: string;
  /** Текст сообщения */
  message: string;
  /** Обработчик перезапуска игры */
  onRestart?: () => void;
}

const FailScreen = (props: FailScreenProps): JSX.Element => {
  const {title, message, onRestart} = props;

  return (
    <section className="result">
      <div className="result__logo">
        <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"/>
      </div>
      <h2 className="result__title">{title}</h2>
      <p className="result__total result__total--fail">
        {message}
      </p>
      <button className="replay" type="button" onClick={onRestart}>
        {`Попробовать ещё раз`}
      </button>
    </section>
  );
};

export default FailScreen;
