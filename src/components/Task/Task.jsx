import clsx from 'clsx';
import s from './Task.module.css';
import icons from '../../images/icons.svg';
import { useSelector } from 'react-redux';
import { selectUserTheme } from '../../redux/user/userSelectors';
import { useEffect, useState } from 'react';
import { openModal } from '../../redux/modal/modalSlice';
import { useDispatch } from 'react-redux';
import { AddEditCard } from '../ScreensPage/AddEditCard';
import {
  deleteTaskThunk,
  updateTaskThunk,
} from '../../redux/tasks/tasksOperations';
import { selectBoardid, selectColumnid } from '../../redux/tasks/tasksSelctors';

export const Task = ({ columnid, task }) => {
  const boardid = useSelector(selectBoardid);
  const taskid = task._id;
  const [showEditTask, setShowEditTask] = useState(false);
  const dispatch = useDispatch();
  const handleEditTask = () => {
    dispatch(openModal());
    setShowEditTask(true);
  };
  const handleDeleteTask = data => {
    dispatch(deleteTaskThunk(data));
  };
  const colorScheme = useSelector(selectUserTheme);
  useEffect(() => {
    document.documentElement.setAttribute('theme', colorScheme);
  }, [colorScheme]);
  const formatDate = dateString => {
    const date = new Date(dateString);
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
  };
  const formattedDate = formatDate(task.deadline);
  const today = formatDate(new Date());

  return (
    <>
      <li className={s.boardTaskBackground} key={task._id}>
        <ul className={s.boardTask}>
          <li className={s.taskTitle}>{title}</li>
          <li className={s.taskDescr}>{description}</li>
          <li className={s.taskInfo}>
            <div>
              Priority
              <div className={s.priorityBox}>
                <span
                  style={{ backgroundColor: priorityColor }}
                  className={s.priorityCircle}
                ></span>
                <span className={s.taskProps}>{priority}</span>
              </div>
            </div>
            <div className={s.deadlineBox}>
              Deadline
              <span className={s.taskProps}>{formattedDate}</span>
            </div>
            <ul className={s.taskActions}>
              {today === formattedDate && (
                <li>
                  <svg className={clsx(s.taskIcon, s.taskIconGlocke)}>
                    <use href={`${icons}#icon-glocke`}></use>
                  </svg>
                </li>
              )}
              <li>
                <svg
                  className={s.taskIcon}
                  // onClick={}
                >
                  <use href={`${icons}#icon-arrow-circle-broken-right`}></use>
                </svg>
              </li>
              <li>
                <svg className={s.taskIcon} onClick={handleEditTask}>
                  <use href={`${icons}#icon-pencil`}></use>
                </svg>
              </li>
              <li>
                <svg
                  className={s.taskIcon}
                  onClick={() => {
                    handleDeleteTask({
                      boardId: boardid,
                      columnId: columnid,
                      taskId: taskid,
                    });
                  }}
                >
                  <use href={`${icons}#icon-trash`}></use>
                </svg>
              </li>
            </ul>
          </li>
        </ul>
      </li>
      {showEditTask && (
        <AddEditCard
          addForm={false}
          onSubmitThunk={updateTaskThunk}
          boardId={boardid}
          columnId={columnid}
          taskId={taskid}
          isOpen={openModal()}
        />
      )}
    </>
  );
};
