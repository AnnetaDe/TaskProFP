import { useDispatch } from 'react-redux';
import InputField from '../InputField/InputField';
import Modal from '../Modal/Modal';
import { useForm } from 'react-hook-form';
import { Button } from '../Button/Button';

export const AddEditColumn = ({ addForm = false, onSubmitThunk, boardId }) => {
  const dispatch = useDispatch();
  const isLoading = false;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: addForm ? { title: '' } : { title: '' },
    mode: 'onSubmit',
  });
  const onSubmit = data => {
    console.log(data, 'add/edit column');
    dispatch(onSubmitThunk(boardId, data)).then(data => {
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
        <h2>{addForm ? 'Add column' : 'Edit column'}</h2>
        <InputField
          placeholder="Title"
          name="title"
          register={register}
          errors
        />
        <Button
          buttonText={addForm ? 'Add' : 'Edit'}
          type="submit"
          typeStyle="primary"
          icon="+"
        />
      </form>
    </Modal>
  );
};
