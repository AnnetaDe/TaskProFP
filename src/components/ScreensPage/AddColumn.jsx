import { useDispatch } from 'react-redux';
import InputField from '../InputField/InputField';
import Modal from '../Modal/Modal';

export const AddColumn = () => {
  const dispatch = useDispatch();

  const handleSubmit = event => {
    event.preventDefault();
    console.log('Form column submitted');
    dispatch(addNewColumn(), closeModal());
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
