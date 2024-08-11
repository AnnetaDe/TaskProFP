import s from './CreateNewBoard.module.css';
import icons from '../../../images/icons.svg';
import { useEffect, useState } from 'react';
import Modal from '../../Modal/Modal';
import { useDispatch } from 'react-redux';
import { createBoardThunk } from '../../../redux/boards/boardsOperations';
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

  const toggleModal = () => {
    // setIsOpen(isOpen => !isOpen);
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
        {/* <button type="button" className={s.createButton} onClick={toggleModal}>
          <svg width="40px" height="20px" className={s.iconPlus}>
            <use href={`${icons}#icon-plus-small`}> </use>
          </svg>
        </button> */}
      </div>
      {isOpenCreateBoardModal && (
        <Modal title='' isOpen={openCreateBoardModaal} closeModal={closeCreateBoardModaal}>
          <BoardModal onClose={()=>dispatch(closeCreateBoardModaal())}/>
          {/* children={<ModalBoard onClose={toggleModal} />} */}
        </Modal>
      )}
    </>
  );
};

export default CreateNewBoard;
