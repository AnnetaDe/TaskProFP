import { Task } from '../Task/Task';
import s from './Column.module.css';

export const Column = ({ column }) => {
  return (
    <ul className={s.column}>
      <p>{column.title}</p>

      {column.tasks.map(task => (
        <Task key={task._id} task={task} />
      ))}
    </ul>
  );
};
