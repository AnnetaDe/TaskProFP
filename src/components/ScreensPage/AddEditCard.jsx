import { useDispatch } from 'react-redux';
import InputField from '../InputField/InputField';
import Modal from '../Modal/Modal';
import CusDatePicker from '../DatePicker/DatePicker';
import { useForm, Controller } from 'react-hook-form';
import { Button } from '../Button/Button';
import { openModal } from '../../redux/modal/modalSlice';

export const AddEditCard = ({
  addForm = false,
  onSubmitThunk,
  boardId,
  columnId,
  isOpen,
}) => {
  const { control } = useForm();
  const dispatch = useDispatch();
  const isLoading = false;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: addForm
      ? { title: '', description: '', priority: '', deadline: '' }
      : { title: '', description: '', priority: '', deadline: '' },
    mode: 'onSubmit',
  });
  const onSubmit = data => {
    console.log(data, 'add/edit card');
    dispatch(onSubmitThunk(boardId, columnId, data));
    reset();
  };

  return (
    <Modal isOpen={isOpen}>
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
        {/* <label>
          <p>Deadline</p>
          <CusDatePicker
            selectedDeadline={deadline}
            control={control}
            name="deadline"
            register={register}
          />
        </label> */}
        <Button
          buttonText={addForm ? 'Add' : 'Edit'}
          onClick
          type="submit"
          typeStyle="primary"
          icon="+"
        />
      </form>
    </Modal>
  );
};
