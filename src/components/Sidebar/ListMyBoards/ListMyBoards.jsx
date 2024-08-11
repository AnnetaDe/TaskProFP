import { useSelector } from 'react-redux';
import { selectBoard } from '../../../redux/boards/boardsSelectors';
import s from './ListMyBoards.module.css';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchBoardsThunk } from '../../../redux/boards/boardsOperations';

export const ListMyBoards = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const boards = useSelector(selectBoard);
  useEffect(() => {
    dispatch(fetchBoardsThunk());
  }, [dispatch]);
  console.log(boards);
  return (
    <ul className={s.boards_list}>
      {boards.map(board => (
        <NavLink
          key={board._id}
          className={s.list_item}
          onClick={() => navigate(`board/${board._id}`)}
        >
          <div>{board.title}</div>
        </NavLink>
      ))}
    </ul>
  );
};
