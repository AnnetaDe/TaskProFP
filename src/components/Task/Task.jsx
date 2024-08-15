import clsx from 'clsx';
import s from './Task.module.css';
import { TaskControler } from './TaskControler';
import { priorities } from '../../constants/dataForBoardModal';
import { useState } from 'react';

export const Task = ({ task, columnid, boardid }) => {
  const { title, description, priority, deadline } = task;
  // const taskid = task._id;
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
          <TaskControler
            taskid={task._id}
            columnid={columnid}
            boardid={boardid}
            task={task}
          />
        </li>
      </ul>
    </li>
  );
};
