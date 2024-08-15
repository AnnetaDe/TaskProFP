import s from './TaskControler.module.css';
import icons from '../../images/icons.svg';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTaskThunk } from '../../redux/tasks/tasksOperations';
export const TaskControler = ({ taskid, columnid, boardid }) => {
  console.log(taskid, columnid, boardid);

  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const handleDelete = taskid => {
    dispatch(deleteTaskThunk({ boardid, columnid, taskid }));
  };

  // updateTaskThunk({
  //   boardid: id,
  //   columnid: columnid,
  //   taskid: columnid,
  //   body: { taskId: taskid },
  // });

  return (
    <ul className={s.taskActions}>
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
        <button className={s.btn_icon}>
          <svg
            className={s.taskIcon}
            // onClick={}
          >
            <use href={`${icons}#icon-pencil`}></use>
          </svg>
        </button>
      </li>
      <li>
        <button className={s.btn_icon} onClick={() => handleDelete(taskid)}>
          <svg
            className={s.taskIcon}
            // onClick={}
          >
            <use href={`${icons}#icon-trash`}></use>
          </svg>
        </button>
      </li>
    </ul>
  );
};
