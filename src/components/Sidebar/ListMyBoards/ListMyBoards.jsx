import { useSelector } from 'react-redux';
import { selectBoard } from '../../../redux/boards/boardsSelectors';
import s from './ListMyBoards.module.css';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  deleteBoardThunk,
  fetchBoardByIdThunk,
  fetchBoardsThunk,
} from '../../../redux/boards/boardsOperations';
import clsx from 'clsx';
import iconsSprite from '../../../images/icons.svg';
import { icons } from '../../../constants/dataForBoardModal';
import { selectEditBoardOpen } from '../../../redux/modal/modalSelector';
import {
  closeEditBoardModaal,
  openEditBoarModaal,
} from '../../../redux/modal/modalSlice';
import Modal from '../../Modal/Modal';
import BoardModal from '../BoardModal/BoardModal';
// import {
//   setFilter,
//   setFilteredColumns,
// } from '../../../redux/columns/columnsSlice';
import { getAllCoulumnsWithBoardIdThunk } from '../../../redux/columns/columnsOperations';
import { selectCurrentBoardId } from '../../../redux/columns/columnsSelectors';

const ListMyBoards = ({ className }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const boards = useSelector(selectBoard);
  const currentBoardId = useSelector(selectCurrentBoardId);
  useEffect(() => {
    dispatch(fetchBoardsThunk());
  }, [dispatch]);

  const isEditBoardOpen = useSelector(selectEditBoardOpen);
  const [chosenBoard, setChosenBoard] = useState('');
  const handleEditOpen = board => {
    setChosenBoard(board);
    dispatch(openEditBoarModaal());
  };
  const handleDelete = boardId => {
    dispatch(deleteBoardThunk(boardId));
  };
  const handleClick = board => {
    setChosenBoard(board);
    // dispatch(setFilter(null));
    // dispatch(setFilteredColumns());
  };
  const handleSetCurrentBoardId = boardId => {
    dispatch(getAllCoulumnsWithBoardIdThunk(boardId));
  };
  return (
    <ul className={clsx(s.boards_list, className)}>
      {boards.map(board => {
        const icon = icons.find(icon => icon.iconName === board.icon);

        return (
          <li
            key={board._id}
            onClick={() => handleClick(board)}
            className={s.li_board_item}
          >
            <NavLink
              to={`board/${board._id}`}
              className={({ isActive }) =>
                clsx(s.board_item, board._id === currentBoardId ? s.active : '')
              }
              onClick={() => handleSetCurrentBoardId(board._id)}
            >
              <div className={s.left_side}>
                <svg width="18" height="18" className={s.board_item_svg}>
                  <use href={icon.svg}></use>
                </svg>

                <p>{board.title}</p>
              </div>
              <div className={s.right_side}>
                <button onClick={() => handleEditOpen(board)}>
                  <svg width="16" height="16">
                    <use href={`${iconsSprite}#icon-pencil`}></use>
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleDelete(board._id);
                  }}
                >
                  <svg width="16" height="16">
                    <use href={`${iconsSprite}#icon-trash`}></use>
                  </svg>
                </button>
              </div>
            </NavLink>
          </li>
        );
      })}

      {isEditBoardOpen && (
        <Modal
          isOpen={isEditBoardOpen}
          closeModal={closeEditBoardModaal}
          title="Edit profile"
        >
          <BoardModal
            type="edit"
            title={chosenBoard.title}
            chosenIcon={chosenBoard.icon}
            chosenBackGround={chosenBoard.preview}
            onClose={() => dispatch(closeEditBoardModaal())}
          />
        </Modal>
      )}
    </ul>
  );
};
export default ListMyBoards;
