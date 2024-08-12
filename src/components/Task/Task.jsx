import s from './Task.module.css';
export const Task = ({ task }) => {
  return (
    <li className={s.boardTask} key={task._id}>
      <ul>
        <li>{task.title}</li>
        <li>{task.description}</li>
        <li>
          <ul>
            <li>{task.priority}</li>
            <li>{task.deadline}</li>
            <li>{'buttons'}</li>
          </ul>
        </li>
      </ul>
    </li>
  );
};
