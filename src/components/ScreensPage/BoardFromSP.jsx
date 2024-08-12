import { useDispatch } from 'react-redux';
import { openModal } from '../../redux/modal/modalSlice';
import { Column } from './Column';
import { AddEditColumn } from './AddEditColumn';
import { useEffect, useState } from 'react';
import { fetchBoardByIdThunk } from '../../redux/boards/boardsOperations';
import { createNewColumnThunk } from '../../redux/columns/columnsOperations';

export const Board = ({ boardId }) => {
  const dispatch = useDispatch();
  const [board, setBoard] = useState(null);
  const [showColumn, setShowColumn] = useState(false);

  const handleCreateColumn = () => {
    dispatch(openModal());
    setShowColumn(true);
  };

  useEffect(() => {
    dispatch(fetchBoardByIdThunk(boardId)).then(data =>
      setBoard(data.payload.data)
    );
  }, [dispatch]);

  console.log(board);
  return (
    <>
      {board ? (
        <>
          <div>
            <h2>{board.title}</h2>
            <p>Filters</p>
          </div>
          {board.columns.map(column => (
            <Column key={column._id} column={column} />
          ))}
          <button onClick={handleCreateColumn}>Add another column</button>
        </>
      ) : (
        <p></p>
      )}
      {showColumn && (
        <AddEditColumn
          addForm={true}
          onSubmitThunk={createNewColumnThunk}
          boardId={boardId}
        />
      )}
    </>
  );
};
