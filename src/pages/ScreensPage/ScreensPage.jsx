import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from '../../redux/modal/modalSlice';
import { AddEditBoard } from '../../components/ScreensPage/AddEditBoard';
import { createBoardThunk } from '../../redux/boards/boardsOperations';

export const ScreensPage = () => {
  const dispatch = useDispatch();
  const [showBoard, setShowBoard] = useState(false);

  const handleCreateBoard = () => {
    dispatch(openModal()); // Trigger the modal
    setShowBoard(true); // Set the state to render the Board component
  };

  return (
    <div>
      <p>Filter</p>
      <p>
        Before starting your project, it is essential
        <button onClick={handleCreateBoard}>to create a board</button>
        to visualize and track all the necessary tasks and milestones. This
        board serves as a powerful tool to organize the workflow and ensure
        effective collaboration among team members.
      </p>
      {showBoard && <AddEditBoard onSubmitThunk={createBoardThunk} />}
    </div>
  );
};

export default ScreensPage;
