import s from './TaskControler.module.css';
import icons from '../../images/icons.svg';
import clsx from 'clsx';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import ModalWithoutRedux from '../ModalWithoutRedux/ModalWithoutRedux';
import CardForm from '../CardForm/CardForm';
import { useDispatch } from 'react-redux';
import { deleteTaskThunk } from '../../redux/tasks/tasksOperations';
export const TaskControler = ({ className, columnId, task }) => {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const handleDelete = taskId => {
    console.log(columnId);

    dispatch(
      deleteTaskThunk({ boardId: id, columnId, taskId: taskId })
    );
  };
  return (
    <>
      <ul className={clsx(s.taskActions, className)}>
        <li>
          <button className={s.btn_icon}>
            <svg
              className={s.taskIcon}
              // onClick={}
            >
              <use href={`${icons}#icon-glocke`}></use>
            </svg>
          </button>
        </li>
        <li>
          <button className={s.btn_icon}>
            <svg
              className={s.taskIcon}
              // onClick={}
            >
              <use href={`${icons}#icon-arrow-circle-broken-right`}></use>
            </svg>
          </button>
        </li>
        <li>
          <button className={s.btn_icon} onClick={openModal}>
            <svg
              className={s.taskIcon}
              // onClick={}
            >
              <use href={`${icons}#icon-pencil`}></use>
            </svg>
          </button>
        </li>
        <li>
          <button className={s.btn_icon} onClick={() => handleDelete(task._id)}>
            <svg
              className={s.taskIcon}
              // onClick={}
            >
              <use href={`${icons}#icon-trash`}></use>
            </svg>
          </button>
        </li>
      </ul>
      {isOpen && (
        <ModalWithoutRedux
          isOpen={isOpen}
          onClose={closeModal}
          title="Add card"
        >
          <CardForm
            onClose={() => closeModal()}
            type="edit"
            boardId={id}
            columnId={columnId}
            task={task}
          />
        </ModalWithoutRedux>
      )}{' '}
    </>
  );
};
