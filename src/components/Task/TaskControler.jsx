import s from './TaskControler.module.css';
import icons from '../../images/icons.svg';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  deleteTaskThunk,
} from '../../redux/tasks/tasksOperations';
import ModalWithoutRedux from '../ModalWithoutRedux/ModalWithoutRedux';
import CardForm from '../CardForm/CardForm';
import { clsx } from 'clsx';
import WarningDedline from '../WarningDedline/WarningDedline';


export const TaskControler = ({
  task,
  columnid,
  className,
}) => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const [isEditOpen, setIsEditOpen] = useState();
  const taskid = task._id;
  const openEditModal = () => {
    setIsEditOpen(true);
  };
  const closeEditModal = () => {
    setIsEditOpen(false);
  };
  const handleDelete = taskid => {
    dispatch(deleteTaskThunk({ boardid: id, columnid, taskid }));
  };
  console.log('TaskControler taskid', taskid);
  console.log('TaskControler columnid', columnid);

  return (
    <>
      <ul className={clsx(s.taskActions, className)}>
        <li>
          <button className={s.btn_icon}>
            <WarningDedline deadline={task.deadline} />
          </button>
        </li>
        <li>
          <button className={s.btn_icon} onClick={openEditModal}>
            <svg
              className={s.taskIcon}
            >
              <use href={`${icons}#icon-pencil`}></use>
            </svg>
          </button>
        </li>
        <li>
          <button className={s.btn_icon} onClick={() => handleDelete(taskid)}>
            <svg
              className={s.taskIcon}
            >
              <use href={`${icons}#icon-trash`}></use>
            </svg>
          </button>
        </li>
      </ul>
      {isEditOpen && (
        <ModalWithoutRedux
          isOpen={isEditOpen}
          onClose={closeEditModal}
          title="Edit card"
        >
          <CardForm
            onClose={closeEditModal}
            type="edit"
            boardid={id}
            columnid={columnid}
            task={task}
          />
        </ModalWithoutRedux>
      )}
    </>
  );
};
