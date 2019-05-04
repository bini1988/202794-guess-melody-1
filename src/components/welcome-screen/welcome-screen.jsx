import React from "react";
import PropTypes from "prop-types";

const WelcomeScreen = (props) => {
  const {maxTime, maxMistakes, onBeginClick} = props;

  return (
    <section className="welcome">
      <div className="welcome__logo">
        <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"/>
      </div>
      <button className="welcome__button" onClick={onBeginClick}>
        <span className="visually-hidden">{`Начать игру`}</span>
      </button>
      <h2 className="welcome__rules-title">{`Правила игры`}</h2>
      <p className="welcome__text">{`Правила просты:`}</p>
      <ul className="welcome__rules-list">
        <li>{`За ${maxTime} минут нужно ответить на все вопросы.`}</li>
        <li>{`Можно допустить ${maxMistakes} ошибки.`}</li>
      </ul>
      <p className="welcome__text">{`Удачи!`}</p>
    </section>
  );
};

WelcomeScreen.propTypes = {
  /** Игровое время, мин */
  maxTime: PropTypes.number.isRequired,
  /** Количество допустимых ошибок */
  maxMistakes: PropTypes.number.isRequired,
  /** Обработчки клика по кнопке запуска игры */
  onBeginClick: PropTypes.func,
};

export default WelcomeScreen;
