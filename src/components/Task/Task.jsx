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

export const Task = ({ task }) => {
  const { title, description, priority, deadline } = task;
  const priorityColor = priorities.find(
    item => item.priorityLevel === priority
  );

  return (
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
            <span className={s.taskProps}> 2000</span>{' '}
            {/* change for DatePicker */}
            {/* <span className={s.taskProps}>{deadline}</span> */}
          </div>
          <TaskControler />
        </li>
      </ul>
    </li>
  );
};
