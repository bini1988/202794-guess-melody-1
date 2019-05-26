import React from "react";

export interface ConfirmModalProps {
  /** Подтверждение перезапуска игры */
  onConfirm?: () => void;
  /** Отмена перезапуска игры */
  onCancel?: () => void;
}

const ConfirmModal = (props: ConfirmModalProps): JSX.Element => {
  const {onConfirm, onCancel} = props;

  return (
    <section className="modal">
      <button className="modal__close" type="button" onClick={onCancel}>
        <span className="visually-hidden">{`Закрыть`}</span>
      </button>
      <h2 className="modal__title">{`Подтверждение`}</h2>
      <p className="modal__text">
        {`Вы уверены что хотите начать игру заново?`}
      </p>
      <div className="modal__buttons">
        <button className="modal__button button" onClick={onConfirm}>
          {`Ок`}
        </button>
        <button className="modal__button button" onClick={onCancel}>
          {`Отмена`}
        </button>
      </div>
    </section>
  );
};

export default ConfirmModal;
