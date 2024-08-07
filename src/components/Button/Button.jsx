import clsx from 'clsx';
import s from './Button.module.css';

const btnTypes = ['transparent', 'primary', 'secondary'];

export const Button = ({ buttonText = '', type = 'primary', icon = '' }) => {
  return (
    <>
      {type === 'small' ? (
        <button className={clsx(s.btn_small)}>
          <svg width="20" height="20">
            <use href={icon}></use>
          </svg>
        </button>
      ) : (
        <button
          className={clsx(s.btn, {
            [s.transparent]: type === 'transparent',
            [s.primary]: type === 'primary',
            [s.secondary]: type === 'secondary',
            [s.small]: type === 'small',
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
