import { useDispatch } from 'react-redux';
import InputField from '../InputField/InputField';
import Modal from '../Modal/Modal';
import CusDatePicker from '../DatePicker/DatePicker';
import { useForm, Controller } from 'react-hook-form';
import { Button } from '../Button/Button';
import { closeEditColumnModal, closeModal } from '../../redux/modal/modalSlice';
import PriorityList from '../CardForm/PriorityList/PriorityList';
import { useState } from 'react';
import { priorities } from '../../constants/dataForBoardModal';
import s from './AddEditCard.module.css';
import ModalWithoutRedux from '../ModalWithoutRedux/ModalWithoutRedux';

export const AddEditCard = ({
  addForm = false,
  onSubmitThunk,
  boardId,
  columnId,
  taskId,
  isOpen,
  task,
  formattedDate,
  onClose
}) => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      priority: '',
      deadline: formattedDate || '',
    },
    mode: 'onSubmit',
  });
  const [selectedPriority, setSelectedPriority] = useState(priorities);
  // const [isOpen, setIsOpen] = useState();
  // const openModal = () => {
  //   setIsOpen(true);
  // };
  // const closeModal = () => {
  //   setIsOpen(false);
  // };
  const dispatch = useDispatch();
  const isLoading = false;

  const onSubmit = data => {
    console.log(data, 'add/edit card');
    dispatch(onSubmitThunk({ boardId, columnId, taskId, task: data })).then(
      data => {
        console.log(data);
        if (data.error !== undefined) {
          console.log(data.error.message);
        } else {
          reset();
          // dispatch(closeModal());
          // closeModal();
          onClose()
        }
      }
    );
  };

  return (
    <ModalWithoutRedux isOpen={isOpen} onClose={onClose}>
      <form
        // onClose={closeModal}
        className={s.taskForm}
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <h2>{addForm ? 'Add card' : 'Edit card'}</h2>
        <InputField
          className
          placeholder="Title"
          name="title"
          register={register}
          errors={errors}
        />
        <InputField
          className
          isTextArea="true"
          placeholder="Description"
          name="description"
          register={register}
          errors={errors}
        />
        <label className={s.label}>
          <p>Label color</p>
          <PriorityList
            selectedPriority={selectedPriority}
            setSelectedPriority={setSelectedPriority}
            register={register}
            name="priority"
          />
        </label>
        <label className={s.label}>
          <p>Deadline</p>
          <CusDatePicker
            className={s.deadlinePicker}
            selectedDeadline={formattedDate}
            control={control}
            name="deadline"
          />
        </label>
        <Button
          buttonText={addForm ? 'Add' : 'Edit'}
          type="submit"
          typeStyle="primary"
          icon="+"
        />
      </form>
    </ModalWithoutRedux>
  );
};
