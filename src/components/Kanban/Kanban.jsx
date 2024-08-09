import { useDispatch } from 'react-redux';
import { fetchBoardsThunk } from '../../redux/boards/boardsOperations';
import { useEffect } from 'react';
import { Board } from '../Board/Board';
import { useSelector } from 'react-redux';
import {
  selectBoard,
  selectBoardsIds,
} from '../../redux/boards/boardsSelectors';
import { getAllCoulumnsWithBoardIdThunk } from '../../redux/columns/columnsOperations';

const Kanban = () => {
  const boards = useSelector(selectBoard);
  const boardsIds = useSelector(selectBoardsIds);

  console.log(boards);

  return (
    <div>
      Kanban
      <ul>
        {boards.map(board => (
          <Board key={board._id} board={board} />
        ))}
      </ul>
    </div>
  );
};
export default Kanban;
