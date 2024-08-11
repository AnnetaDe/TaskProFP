import { useSelector } from 'react-redux';
import { selectBoard } from '../../../redux/boards/boardsSelectors';
import s from './ListMyBoards.module.css';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchBoardsThunk } from '../../../redux/boards/boardsOperations';
import { ScreensPage } from '../../../pages';

export const ListMyBoards = () => {
  const dispatch = useDispatch();
  const myMenu = useSelector(selectBoard);
  useEffect(() => {
    dispatch(fetchBoardsThunk());
  }, [dispatch]);
  console.log(myMenu);
  return (
    <div>
      {myMenu.map(board => (
        <NavLink
          key={board._id}
          className={s.listItem}
          to={`board/${board._id}`}
        >
          <div>{board.title}</div>
        </NavLink>
      ))}
    </div>
  );
};
