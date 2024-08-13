import { useDispatch } from 'react-redux';
import { openModal } from '../../redux/modal/modalSlice';
import { Card } from './Card';
import { AddEditCard } from './AddEditCard';

export const Column = ({ column }) => {
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(openModal({ content: AddEditCard }));
  };

  return (
    <>
      {/* <p>Hello</p> */}
      <div>
        <h2>{column.title}</h2>
        <button>Edit</button>
        <button>Delete</button>
      </div>
      {column.map(card => (
        <Card key={card.id} card={card} />
      ))}
      <button onClick={handleOpenModal}>Add another card</button>
    </>
  );
};
