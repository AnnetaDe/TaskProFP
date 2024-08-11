import s from './Task.module.css';
export const Task = ({ task }) => {
  return (
    <li className={s.boardTask} key={task._id}>
      {'  task   '}
      {task.title}
    </li>
  );
};
