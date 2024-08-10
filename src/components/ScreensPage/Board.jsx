import { useDispatch } from 'react-redux';
import { openModal } from '../../redux/modal/modalSlice';
import { Column } from './Column';
import { AddEditColumn } from './AddEditColumn';
import { useSelector } from 'react-redux';
import { selectBoard } from '../../redux/boards/boardsSelectors';

export const Board = ({ title }) => {
  const board = useSelector(selectBoard);
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(openModal({ content: AddEditColumn }));
  };

  console.log(board);
  return (
    <>
      <div>
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
