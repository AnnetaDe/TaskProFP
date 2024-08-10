import { useSelector } from 'react-redux';
import { selectBoard } from '../../../redux/boards/boardsSelectors';
import s from './ListMyBoards.module.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchBoardsThunk } from '../../../redux/boards/boardsOperations';

export const ListMyBoards = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const myMenu = useSelector(selectBoard);
  useEffect(() => {
    dispatch(fetchBoardsThunk());
  }, [dispatch]);
  console.log(myMenu);
  return (
    <div>
      {myMenu.map(board => (
        <li
          key={board._id}
          className={s.listItem}
          onClick={() => navigate(`board/${board._id}`)}
        >
          <div>{board.title}</div>
        </li>
      ))}
    </div>
  );
};
