import { useDispatch } from 'react-redux';
import { openModal } from '../../redux/modal/modalSlice';
import { Card } from './Card';
import { AddEditCard } from './AddEditCard';

export const Column = ({ column, title }) => {
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(openModal({ content: AddEditCard }));
  };

  return (
    <>
      <div className={s.columnHead}>
        <h2>{title}</h2>
        <button className={s.editBtn}>Edit</button>
        <button className={s.deleteBtn}>Delete</button>
      </div>
      {column.map(card => (
        <Card key={card.id} card={card} />
      ))}
      <button onClick={handleOpenModal}>Add another card</button>
    </>
  );
};
