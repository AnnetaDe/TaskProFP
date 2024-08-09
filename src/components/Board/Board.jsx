import { useDispatch } from 'react-redux';
import { getAllCoulumnsWithBoardIdThunk } from '../../redux/columns/columnsOperations';

export const Board = ({ board }) => {
  const dispatch = useDispatch();
  console.log('board', board._id);

  dispatch(getAllCoulumnsWithBoardIdThunk(board._id));
  // dispatch(createNewColumnThunk(board._id, { title: 'new column' }));

  return (
    <li>
      <div>{board._id}</div>
      <div>{board.title}</div>
      <div>{board.icon}</div>
    </li>
  );
};
