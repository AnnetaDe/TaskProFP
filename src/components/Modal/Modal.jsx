import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from './modalSlice';
import css from './Modal.module.css';
import { selectModal } from '../../redux/modal/modalSelector';
import { useEffect } from 'react';
import clsx from 'clsx';

const Modal = ({ children }) => {
  const isOpen = useSelector(selectModal);
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
        <button className={css.closeBtn} onClick={() => dispatch(closeModal())}>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.5 1.5L10.5 10.5"
              stroke="#161616"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={clsx(css.icon)}
            />
          </svg>
        </button>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default Modal;
