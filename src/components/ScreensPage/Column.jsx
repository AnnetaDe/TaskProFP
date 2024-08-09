import { AddCard } from './AddCard';
import { SingleCard } from './SingleCard';

export const Column = ({ data, title }) => {
  return (
    <>
      <div className={s.columnHead}>
        <h2>{title}</h2>
        <button className={s.editBtn}>Edit</button>
        <button className={s.deleteBtn}>Delete</button>
      </div>
      {data.map(item => (
        <SingleCard key={item.id} item={card} />
      ))}
    </>
  );
};
