import { useDispatch } from 'react-redux';
import s from './ColumnTitle.module.css';
import { openEditTaskModal } from '../../redux/modal/modalSlice';
import { deleteTaskThunk } from '../../redux/tasks/tasksOperations';
import iconsSprite from '../../images/icons.svg';

const ColumnTitle = ({ title, boardId }) => {
  const dispatch = useDispatch();

  const handleEditOpen = () => {
    dispatch(openEditTaskModal());
  };
  const handleDelete = boardId => {
    dispatch(deleteTaskThunk(boardId));
  };

  return (
    <div  >
      <p>{title}</p>
      <div className={s.right_side}>
        <button onClick={handleEditOpen}>
          <svg width="16" height="16">
            <use href={`${iconsSprite}#icon-pencil`}></use>
          </svg>
        </button>
        <button
          type="button"
          onClick={() => {
            handleDelete(boardId);
          }}
        >
          <svg width="16" height="16">
            <use href={`${iconsSprite}#icon-trash`}></use>
          </svg>
        </button>
      </div>
    </div>
  );
};
export default ColumnTitle;
