import { useDispatch } from 'react-redux';
import { SingleCard } from './SingleCard';
import { AddCard } from './AddCard';
import { openModal } from '../../redux/modal/modalSlice';

export const Column = ({ data, title }) => {
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(openModal({ content: AddCard }));
  };

  return (
    <>
      <div className={s.columnHead}>
        <h2>{title}</h2>
        <button className={s.editBtn}>Edit</button>
        <button className={s.deleteBtn}>Delete</button>
      </div>
      {data.map(card => (
        <SingleCard key={card.id} card={card} />
      ))}
      <button onClick={handleOpenModal}>Add another card</button>
    </>
  );
};
