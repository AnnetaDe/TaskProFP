import { useSelector } from 'react-redux';
import { selectBoard } from '../../../redux/boards/boardsSelectors';
import s from './ListMyBoards.module.css';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
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
import ModalWithoutRedux from '../../ModalWithoutRedux/ModalWithoutRedux';

const ListMyBoards = ({ className }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const boards = useSelector(selectBoard);
  const currentBoardId = useSelector(selectCurrentBoardId);
  useEffect(() => {
    dispatch(fetchBoardsThunk());
  }, [dispatch]);
  const [isOpen, setIsOpen] = useState(false)
  const openModal = ()=>{
    setIsOpen(true)
  }
  const closeModal = ()=>{
    setIsOpen(false)
  }

  // const isEditBoardOpen = useSelector(selectEditBoardOpen);
  // const [chosenBoard, setChosenBoard] = useState(null);
  // const handleEditOpen = board => {
  //   setChosenBoard(board);
  //   dispatch(openEditBoarModaal());
  // };
  const handleDelete = async boardId => {
      await dispatch(deleteBoardThunk(boardId)).unwrap();
      navigate('/');
  };
  // const handleClick = board => {
  //   setChosenBoard(board);
  //   // dispatch(setFilter(null));
  //   // dispatch(setFilteredColumns());
  // };
  // const handleSetCurrentBoardId = boardId => {
  //   dispatch(getAllCoulumnsWithBoardIdThunk(boardId));
  // };
  return (
    <ul className={clsx(s.boards_list, className)}>
      {boards.map(board => {
        const icon = icons.find(icon => icon.iconName === board.icon);
console.log(board);

        return (
          <li key={board._id} className={s.li_board_item}>
            <NavLink
              to={`board/${board._id}`}
              className={({ isActive }) =>
                clsx(s.board_item, board._id === currentBoardId ? s.active : '')
              }
              // onClick={() =>
              //   dispatch(getAllCoulumnsWithBoardIdThunk(board._id))
              // }
            >
              <div className={s.left_side}>
                <svg width="18" height="18" className={s.board_item_svg}>
                  <use href={icon.svg}></use>
                </svg>

                <p>{board.title}</p>
              </div>
              <div className={s.right_side}>
                <button
                  type="button"
                  onClick={() => {
                    openModal(board);
                  }}
                >
                  <svg width="16" height="16">
                    <use href={`${iconsSprite}#icon-pencil`}></use>
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={e => {
                    e.stopPropagation();

                    handleDelete(board._id);
                  }}
                >
                  <svg width="16" height="16">
                    <use href={`${iconsSprite}#icon-trash`}></use>
                  </svg>
                </button>
              </div>
            </NavLink>
            {isOpen && (
                <ModalWithoutRedux
                  isOpen={isOpen}
                  onClose={closeModal}
                  title="Edit profile"
                >
                  <BoardModal
                    type="edit"
                    title={board.title}
                    chosenIcon={board.icon}
                    chosenBackGround={board.preview}
                    onClose={closeModal}
                  />
                </ModalWithoutRedux>
              )}
          </li>
        );
      })}

    </ul>
  );
};
export default ListMyBoards;
