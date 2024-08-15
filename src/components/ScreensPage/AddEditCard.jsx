import { useDispatch } from 'react-redux';
import InputField from '../InputField/InputField';
import Modal from '../Modal/Modal';
import { createNewTaskThunk } from '../../redux/tasks/tasksOperations';

export const AddEditCard = ({ editForm = false, addForm = false }) => {
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

  return (
    // <Modal>
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="nope">
      <h2>{addForm ? 'Add card' : 'Edit card'}</h2>
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
      <label>
        <p>Priority</p>
        <InputField
          placeholder="Set color"
          name="priority"
          register={register}
        />
      </label>
      <label>
        <p>Deadline</p>
        <InputField
          placeholder="Set deadline"
          name="deadline"
          register={register}
        />
      </label>
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
