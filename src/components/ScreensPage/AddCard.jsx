import { useDispatch } from 'react-redux';
import InputField from '../InputField/InputField';
import Modal from '../Modal/Modal';
import { createCardThunk } from '../../redux/boards/boardsOperations';

export const AddCard = () => {
  const dispatch = useDispatch();

  const handleSubmit = event => {
    event.preventDefault();
    console.log('Form card submitted');
    dispatch(createCardThunk(), closeModal());
  };
  return (
    <div>
      <button onClick={handleOpenModal}>Add Card</button>

      <Modal>
        <form onSubmit={handleSubmit}>
          <InputField
            className
            height
            width
            placeholder="Title"
            name="title"
            errors
          />
          <InputField
            className
            isTextArea="true"
            height
            width
            placeholder="Description"
            name="description"
            errors
          />
          <p>Priority</p>
          <p>Deadline</p>
          <Button
            buttonText="Add card"
            onClick
            type="button"
            typeStyle="primary"
            icon="+"
          />
        </form>
      </Modal>
    </div>
  );
};
