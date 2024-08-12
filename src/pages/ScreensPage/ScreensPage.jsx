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
import { Board } from '../../components/Board/Board';

export const ScreensPage = () => {
  const dispatch = useDispatch();
  // const boards = useSelector(selectBoard);
  // const [showBoard, setShowBoard] = useState(false);

  // const handleCreateBoard = () => {
  //   dispatch(openModal());
  //   setShowBoard(true);
  // };

  // useEffect(() => {
  //   dispatch(fetchBoardsThunk());
  // }, [dispatch]);
  // console.log(boards);

  return (
    <Board />

    // <>
    //   <p>Filter</p>
    //   <p>
    //     Before starting your project, it is essential to visualize and track all
    //     the necessary tasks and milestones. This board serves as a powerful tool
    //     to organize the workflow and ensure effective collaboration among team
    //     members.
    //   </p>
    // </>
  );
};

export default ScreensPage;
