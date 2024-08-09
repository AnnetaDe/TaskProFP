import { useDispatch } from 'react-redux';
import { getAllCoulumnsWithBoardIdThunk } from '../../redux/columns/columnsOperations';

export const Board = ({ board }) => {
  const dispatch = useDispatch();

  dispatch(getAllCoulumnsWithBoardIdThunk(board._id));

  return (
    <li>
      <div>{board.title}</div>
      <div>{board.icon}</div>
    </li>
  );
};
