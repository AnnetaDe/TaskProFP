import { useSelector } from 'react-redux';
import { selectBoard } from '../../../redux/boards/boardsSelectors';
import s from './ListMyBoards.module.css';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchBoardsThunk } from '../../../redux/boards/boardsOperations';
import clsx from 'clsx';

export const ListMyBoards = ({className}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const boards = useSelector(selectBoard);
  useEffect(() => {
    dispatch(fetchBoardsThunk());
  }, [dispatch]);
  
  return (
    <ul className={clsx(s.boards_list, className)}>
      {boards.map((board) => (
        <NavLink
        to={`board/${board._id}`}
          key={board._id}
          className={s.list_item}
        >
          <div>{board.title}</div>
        </NavLink>
      ))}
    </ul>
  );
};
