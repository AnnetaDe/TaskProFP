import { useDispatch } from 'react-redux';
import InputField from '../InputField/InputField';
import Modal from '../Modal/Modal';
import { useForm } from 'react-hook-form';
import { Button } from '../Button/Button';
import { closeModal } from '../../redux/modal/modalSlice';

export const AddEditBoard = ({ addForm = false, onSubmitThunk }) => {
  const dispatch = useDispatch();
  const isLoading = false;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: addForm
      ? { title: '', icon: '', backgroundImg: '' }
      : { title: '', icon: '', backgroundImg: '' },
    mode: 'onSubmit',
  });
  const onSubmit = data => {
    console.log(data, 'add/edit board');
    dispatch(onSubmitThunk(data)).then(data => {
      console.log(data);
      if (data.error !== undefined) {
        console.log(data.error.message);
      } else {
        reset();
        dispatch(closeModal());
      }
    });
  };

  return (
    <Modal>
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
        <label>
          <p>Icons</p>
          <InputField
            placeholder="Icon"
            name="icon"
            register={register}
            errors
          />
        </label>
        <label>
          <p>Background</p>
          <InputField
            placeholder="Background"
            name="backgroundImg"
            register={register}
            errors
          />
        </label>
        <Button
          buttonText={addForm ? 'Create' : 'Edit'}
          type="submit"
          typeStyle="primary"
          icon="+"
        />
      </form>
    </Modal>
  );
};
