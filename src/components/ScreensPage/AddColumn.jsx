import { useDispatch } from 'react-redux';
import InputField from '../InputField/InputField';
import Modal from '../Modal/Modal';
import { createColumnThunk } from '../../redux/boards/boardsOperations';

export const AddColumn = () => {
  const dispatch = useDispatch();

  const handleSubmit = event => {
    event.preventDefault();
    console.log('Form column submitted');
    dispatch(createColumnThunk(), closeModal());
  };
  return (
    <div>
      <button onClick={handleOpenModal}>Add Column</button>

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
