import { useDispatch } from 'react-redux';
import s from './ColumnTitle.module.css';
import {
  openEditColumnModal,
  closeEditColumnModal,
} from '../../redux/modal/modalSlice';
import iconsSprite from '../../images/icons.svg';
import { deleteColumnThunk } from '../../redux/columns/columnsOperations';
import { useSelector } from 'react-redux';
import { selectEditColumnOpen } from '../../redux/modal/modalSelector';
import ColumnForm from '../ColumnForm/ColumnForm';
import Modal from '../Modal/Modal';
import { useParams } from 'react-router-dom';

const ColumnTitle = ({ title, columnId }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const isOpen = useSelector(state => selectEditColumnOpen(state, columnId));
  const handleEditOpen = () => {
    dispatch(openEditColumnModal(columnId));
  };
  const handleDelete = columnId => {   
    dispatch(deleteColumnThunk({ boardId: id, columnId }));
  };

  return (
    <div className={s.col_title}>
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
            handleDelete(columnId);
          }}
        >
          <svg width="16" height="16">
            <use href={`${iconsSprite}#icon-trash`}></use>
          </svg>
        </button>
      </div>

      {isOpen && (
        <Modal
          isOpen={isOpen}
          closeModal={() => dispatch(closeEditColumnModal(columnId))}
          title="Edit column"
        >
          <ColumnForm
            boardid={id}
            type="edit"
            title={title}
            columnId={columnId}
            onClose={() => dispatch(closeEditColumnModal(columnId))}
          />
        </Modal>
      )}
    </div>
  );
};
export default ColumnTitle;
