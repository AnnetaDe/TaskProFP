import { Task } from '../Task/Task';
import s from './Column.module.css';

export const Column = ({ column }) => {
  return (
    <div className={s.columnWrapper}>
      <div className={s.columnTitle}>
        <p>{column.title}</p>
      </div>
      <ul className={s.column}>
        {column.tasks.map(task => (
          <Task key={task._id} task={task} />
        ))}{' '}
      </ul>
    </div>
  );
};
