
import s from './CreateNewBoard.module.css';
import sprite from "../../../images/icons.svg"


const CreateNewBoard = () => {
  return (
    <>
  <div className={s.boards}>
    <p className={s.text}>
      My boards
    </p>
    </div>
    <div className={s.create}>
    <h2 className={s.title}>Create a new board</h2>
    <button type="button" className={s.createButton}>
    <svg
            width="40px"
            height="36px"
            className={s.iconPlus}
          >
            <use href={sprite + "icon-plus-big"}></use>
            </svg>
    </button>
    {/* {isOpen && (
          <Modal>
            onClose={toggleModal}
            children={<ModalBoard onClose={toggleModal} />}
            </Modal>
        )} */}
  </div>
    </>
  )
}

export default CreateNewBoard
