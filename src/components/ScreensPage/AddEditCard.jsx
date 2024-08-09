import { useDispatch } from 'react-redux';
import InputField from '../InputField/InputField';
import Modal from '../Modal/Modal';
import { createNewTaskThunk } from '../../redux/tasks/tasksOperations';

export const AddEditCard = ({ editForm = false, addForm = false, scheme }) => {
  const dispatch = useDispatch();
  const isLoading = false;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: editForm
      ? { title: '', description: '', priority: '', deadline: '' }
      : { title: '', description: '', priority: '', deadline: '' },
    mode: 'onSubmit',
  });
  const onSubmit = data => {
    console.log(data, 'add/edit card');
    dispatch(onSubmitThunk(data));
    reset();
  };
  // const handleSubmit = event => {
  //   event.preventDefault();
  //   console.log('Form card submitted');
  //   dispatch(createNewTaskThunk(), closeModal());
  // };
  return (
    // <Modal>
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="nope">
      <InputField
        className
        height
        width
        placeholder="Title"
        name="title"
        register={register}
        errors
      />
      <InputField
        className
        isTextArea="true"
        height
        width
        placeholder="Description"
        name="description"
        register={register}
        errors
      />
      <p>Priority</p>
      <p>Deadline</p>
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
