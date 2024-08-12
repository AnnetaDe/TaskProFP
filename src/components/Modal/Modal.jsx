import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { closeModal } from '../../redux/modal/modalSlice';
import css from './Modal.module.css';
import { selectModal } from '../../redux/modal/modalSelector';
import { useEffect } from 'react';
import clsx from 'clsx';
import icon from '../../images/icons.svg';

const Modal = ({ isOpen, title, children, closeModal }) => {
  // const isOpen = useSelector(selectModal);
  const dispatch = useDispatch();
  useEffect(() => {
    const addCloseEvent = e => {
      e.key === 'Escape' && dispatch(closeModal());
    };
    document.addEventListener('keydown', addCloseEvent);

    return () => {
      document.removeEventListener('keydown', addCloseEvent);
    };
  }, [closeModal]);

  const closeOnClickOutside = event => {
    event.currentTarget === event.target && dispatch(closeModal());
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={css.wrapper} onClick={closeOnClickOutside}>
      <div className={css.content}>
        <h2>{title}</h2>
        <button className={css.closeBtn} onClick={() => dispatch(closeModal())}>
          <svg width="18" height="18" className={css.icon}>
            <use href={`${icon}#icon-x-close`}></use>
          </svg>
          {/* <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.5 4.5L4.5 13.5"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={clsx(css.icon)}
              />
              <path
                d="M4.5 4.5L13.5 13.5"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={clsx(css.icon)}
              />
            </svg> */}
        </button>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default Modal;
