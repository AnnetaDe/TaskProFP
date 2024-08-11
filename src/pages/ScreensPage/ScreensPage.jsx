import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from '../../redux/modal/modalSlice';
import { AddEditBoard } from '../../components/ScreensPage/AddEditBoard';
import {
  createBoardThunk,
  fetchBoardsThunk,
} from '../../redux/boards/boardsOperations';
import { selectBoard } from '../../redux/boards/boardsSelectors';
import { useSelector } from 'react-redux';
import { Board } from '../../components/ScreensPage/Board';

export const ScreensPage = () => {
  const dispatch = useDispatch();
  const boards = useSelector(selectBoard);
  const [showBoard, setShowBoard] = useState(false);

  const handleCreateBoard = () => {
    dispatch(openModal());
    setShowBoard(true);
  };

  useEffect(() => {
    dispatch(fetchBoardsThunk());
  }, [dispatch]);
  console.log(boards);

  return (
    <div>
      {!boards || boards.length === 0 ? (
        <>
          <p>Filter</p>
          <p>
            Before starting your project, it is essential
            <button onClick={handleCreateBoard}>to create a board</button>
            to visualize and track all the necessary tasks and milestones. This
            board serves as a powerful tool to organize the workflow and ensure
            effective collaboration among team members.
          </p>
        </>
      ) : (
        boards.map(item => <Board key={item._id} boardId={item._id} />)
      )}
      {showBoard && (
        <AddEditBoard addForm={true} onSubmitThunk={createBoardThunk} />
      )}
    </div>
  );
};

export default ScreensPage;
