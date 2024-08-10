import s from './CreateNewBoard.module.css';
import icons from '../../../images/icons.svg';
import { useEffect, useState } from 'react';
import Modal from '../../Modal/Modal';
import { useDispatch } from 'react-redux';
import { createBoardThunk } from '../../../redux/boards/boardsOperations';
import { useSelector } from 'react-redux';
import { selectModal } from '../../../redux/modal/modalSelector';

const CreateNewBoard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const openModal = useSelector(selectModal);

  // dispatch(
  //   createBoardThunk({
  //     title: 'CREATED BOARD',
  //     icon: 'icon_4',
  //     backgroundImg: 'image_3' }),
  // );

  // !backgroundImg must be one of [image_1, image_2, image_3, image_4, image_5, image_6, image_7, image_8, image_9, image_10, image_11, image_12, image_13, image_14, image_15, null]"
  //на бекенді є такі картинки для бордів для мобільної версії, таблетки і десктопа і він іх підставить сам
  // на субміті з модалки викликати цю функцію, яка створює новий борд в сторі
  // просто так не розкоментовувати, бо буде створювати багато бордів
  // дуже багато бордів
  // на бекенді щось сгорить

  const toggleModal = () => {
    setIsOpen(isOpen => !isOpen);
  };
  return (
    <>
      <div className={s.boards}>
        <p className={s.text}>My boards</p>
      </div>
      <div className={s.create}>
        <p className={s.title}>Create a new board</p>
        <button type="button" className={s.createButton} onClick={toggleModal}>
          <svg width="40px" height="20px" className={s.iconPlus}>
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
  );
};

export default CreateNewBoard;
