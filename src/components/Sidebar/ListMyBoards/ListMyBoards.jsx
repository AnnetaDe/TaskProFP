import { useSelector } from 'react-redux';
import { selectBoard } from '../../../redux/boards/boardsSelectors';
import s from './ListMyBoards.module.css';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchBoardsThunk } from '../../../redux/boards/boardsOperations';
import clsx from 'clsx';
import iconsSprite from '../../../images/icons.svg';
import { icons } from '../BoardModal/dataForBoardModal';

const ListMyBoards = ({ className }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const boards = useSelector(selectBoard);
  useEffect(() => {
    dispatch(fetchBoardsThunk());
  }, [dispatch]);

  return (
    <ul className={clsx(s.boards_list, className)}>
      {boards.map(board => {
        const icon = icons.find(icon => icon.iconName === board.icon);
        return (
          <li key={board._id}>
            <NavLink
              to={`board/${board._id}`}
              className={({ isActive }) =>
                clsx(s.board_item, isActive && s.active)
              }
            >
              <div className={s.left_side}>
                <svg width="18" height="18" className={s.board_item_svg}>
                  <use href={icon.svg}></use>
                </svg>

                <p>{board.title}</p>
              </div>
              <div className={s.right_side}>
                <svg width="16" height="16">
                  <use href={`${iconsSprite}#icon-pencil`}></use>
                </svg>
                <svg width="16" height="16">
                  <use href={`${iconsSprite}#icon-trash`}></use>
                </svg>
              </div>
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
};
export default ListMyBoards;
