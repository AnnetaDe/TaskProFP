import s from './CreateNewBoard.module.css';
import icons from '../../../images/icons.svg';
import Modal from '../../Modal/Modal';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
  selectCreateBoardModal,
  selectModal,
} from '../../../redux/modal/modalSelector';
import { Button } from '../../Button/Button';
import {
  closeCreateBoardModaal,
  openCreateBoardModaal,
} from '../../../redux/modal/modalSlice';
import BoardModal from '../BoardModal/BoardModal';

const CreateNewBoard = () => {
  const dispatch = useDispatch();
  const isOpenCreateBoardModal = useSelector(selectCreateBoardModal);

  const HandleCreate = () => {
    dispatch(openCreateBoardModaal());
  };


  return (
    <>
      <div className={s.boards}>
        <p className={s.text}>My boards</p>
      </div>
      <div className={s.create}>
        <p className={s.title}>Create a new board</p>
        <Button
          small
          onClick={HandleCreate}
          icon={`${icons}#icon-plus-small`}
        />
        <Button
          small
          onClick={HandleCreate}
          icon={`${icons}#icon-plus-small`}
        />
      </div>
      {isOpenCreateBoardModal && (
        <Modal
          title="New board"
          isOpen={openCreateBoardModaal}
          closeModal={closeCreateBoardModaal}
        >
          <BoardModal
            type="create"
            onClose={() => dispatch(closeCreateBoardModaal())}
          />
        </Modal>
      )}
      {isOpenCreateBoardModal && (
        <Modal
          title="New board"
          isOpen={openCreateBoardModaal}
          closeModal={closeCreateBoardModaal}
        >
          <BoardModal
            type="create"
            onClose={() => dispatch(closeCreateBoardModaal())}
          />
        </Modal>
      )}
    </>
  );
};

export default CreateNewBoard;
