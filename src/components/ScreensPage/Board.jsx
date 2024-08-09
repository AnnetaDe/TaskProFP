import { useDispatch } from 'react-redux';
import { openModal } from '../../redux/modal/modalSlice';
import { Column } from './Column';
import { AddEditColumn } from './AddEditColumn';

export const Board = ({ board, title }) => {
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(openModal({ content: AddEditColumn }));
  };

  return (
    <>
      <div className={s.boardHead}>
        <h2>{title}</h2>
        <p>Filters</p>
      </div>
      {board.map(column => (
        <Column key={column.id} column={column} />
      ))}
      <button onClick={handleOpenModal}>Add another column</button>
    </>
  );
};
