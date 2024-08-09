import { useDispatch } from 'react-redux';
import InputField from '../InputField/InputField';
import Modal from '../Modal/Modal';

export const AddEditBoard = ({ editForm = false, addForm = false }) => {
  const dispatch = useDispatch();
  const isLoading = false;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: editForm
      ? { title: '', icon: '', backgroundImg: '' }
      : { title: '', icon: '', backgroundImg: '' },
    mode: 'onSubmit',
  });
  const onSubmit = data => {
    console.log(data, 'add/edit board');
    dispatch(onSubmitThunk(data));
    reset();
  };

  return (
    // <Modal>
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="nope">
      <h2>{addForm ? 'New board' : 'Edit board'}</h2>
      <InputField
        className
        height
        width
        placeholder="Title"
        name="title"
        register={register}
        errors
      />
      <p>Icons</p>
      <p>Background</p>
      <Button
        buttonText={editForm ? 'Edit' : 'Create'}
        onClick
        type="submit"
        typeStyle="primary"
        icon="+"
      />
    </form>
    // </Modal>
  );
};
