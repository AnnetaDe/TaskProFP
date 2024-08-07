import clsx from 'clsx';
import s from './Button.module.css';

export const Button = ({
  buttonText = '',
  onClick,
  type = 'button',
  typeStyle = 'primary',
  icon = '',
}) => {
  return (
    <>
      {type === 'small' ? (
        <button
          className={clsx(s.btn_small)}
          type={type}
          onClick={onClick ? onClick : null}
        >
          <svg width="20" height="20">
            <use href={icon}></use>
          </svg>
        </button>
      ) : (
        <button
          type={type}
          onClick={onClick ? onClick : null}
          className={clsx(s.btn, {
            [s.transparent]: typeStyle === 'transparent',
            [s.primary]: typeStyle === 'primary',
            [s.secondary]: typeStyle === 'secondary',
            [s.small]: typeStyle === 'small',
          })}
        >
          {icon && (
            <div className={s.icon}>
              <svg width="14" height="14">
                <use href={icon}></use>
              </svg>
            </div>
          )}
          {buttonText && <span>{buttonText}</span>}
        </button>
      )}
    </>
  );
};
