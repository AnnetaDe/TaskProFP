import { useSelector } from 'react-redux';
// import { selectColumn } from '../../redux/boards/boardsSelectors';

export const Card = ({ card }) => {
  const { title, description, priority, deadline } = card;
  // const columns = useSelector(selectColumn);
  return (
    <div key={item.id} value={item.id} className={s.taskCard}>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className={s.taskInfo}>
        <p>
          Priority<span>{priority}</span>
        </p>
        <p>
          Deadline<span>{deadline}</span>
        </p>
      </div>
      <div className={s.taskActions}>
        <button className={s.moveBtn}>Move</button>
        <button className={s.editBtn}>Edit</button>
        <button className={s.deleteBtn}>Delete</button>
      </div>
    </div>
  );
};
