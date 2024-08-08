
import s from './CreateNewBoard.module.css';
import icons from "../../../images/icons.svg"
import { useState } from 'react';
import Modal from '../../Modal/Modal';

export const CreateNewBoard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => {
    setIsOpen(isOpen => !isOpen);
  };
  return (
    <>
  <div className={s.boards}>
    <p className={s.text}>
      My boards
    </p>
    </div>
    <div className={s.create}>
    <p className={s.title}>Create a new board</p>
    <button type="button" className={s.createButton} onClick={toggleModal}>
    <svg
            width="40px"
            height="20px"
            className={s.iconPlus}>
              <use href={`${icons}#icon-plus-small`}> </use>
            </svg>
    </button>
    {isOpen && (
          <Modal>
            onClose={toggleModal}
            {/* children={<ModalBoard onClose={toggleModal} />} */}
            </Modal>
        )}
  </div>
    </>
  )
}

export default CreateNewBoard
