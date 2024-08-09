import { useDispatch } from 'react-redux';
import InputField from '../InputField/InputField';
import Modal from '../Modal/Modal';

export const AddEditColumn = ({ editForm = false, addForm = false }) => {
  const dispatch = useDispatch();
  const isLoading = false;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: editForm ? { title: '' } : { title: '' },
    mode: 'onSubmit',
  });
  const onSubmit = data => {
    console.log(data, 'add/edit column');
    dispatch(onSubmitThunk(data));
    reset();
  };

  return (
    // <Modal>
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>{addForm ? 'Add column' : 'Edit column'}</h2>
      <InputField
        className
        height
        width
        placeholder="Title"
        name="title"
        errors
      />
      <Button
        buttonText={editForm ? 'Edit' : 'Add'}
        onClick
        type="submit"
        typeStyle="primary"
        icon="+"
      />
    </form>
    // </Modal>
  );
};
