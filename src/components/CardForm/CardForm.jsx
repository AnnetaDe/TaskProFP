import s from './CardForm.module.css';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import icon from '../../images/icons.svg';
import { useState } from 'react';

import {
  createNewTaskThunk,
  updateTaskThunk,
} from '../../redux/tasks/tasksOperations';
import CusDatePicker from '../DatePicker/DatePicker';
import InputField from '../InputField/InputField';
import { Button } from '../Button/Button';
import PriorityList from './PriorityList/PriorityList';
import { priorities } from '../../constants/dataForBoardModal';
import { CardFormScheme } from '../../schames/BoardFormSchemes';
import { format } from 'date-fns';

const CardForm = ({
  type,
  // title,
  // description,
  // priority,
  // deadline,
  task,
  onClose,
  boardId,
  columnId,
}) => {
  const dispatch = useDispatch();
  const { title, description, deadline, priority } = task;
  const options = {
    create: {
      onSubmitThunk: createNewTaskThunk,
      defaultValues: { title: '', description: '', priority: '', deadline: '' },
    },
    edit: {
      onSubmitThunk: updateTaskThunk,
      defaultValues: {
        title: title,
        description: description,
        priority: priority,
        deadline: deadline,
      },
    },
  };

  const [selectedPriority, setSelectedPriority] = useState(
    options[type].priority || priorities[3].priorityLevel
  );
  // const [selectedDeadline, setSelectedDeadline] = useState(
  //   options[type].deadline
  // );
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: options[type].defaultValues,
    resolver: yupResolver(CardFormScheme),
    mode: 'onChange',
  });
  const onSubmit = data => {
    console.log(data, task);

    const formData = {
      boardId,
      columnId,
      taskId: task._id,
      task: {
        ...data,
        deadline: data.deadline
          ? data.deadline
          : format(new Date(), 'yyyy-MM-dd'),
      },
    };
    console.log(formData);
    dispatch(options[type].onSubmitThunk(formData));

    onClose();
    reset();
  };

  return (
    <form
      className={s.form_styles}
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="nope"
    >
      <div className={s.text_inputs}>
        <InputField
          type="text"
          name="title"
          placeholder="Title"
          register={register}
          errors={errors}
        />
        <InputField
          isTextArea
          type="text"
          name="description"
          placeholder="Description"
          register={register}
          errors={errors}
        />
      </div>
      <div className={s.bottom_inputs}>
        <section>
          <h2>Label color</h2>
          <PriorityList
            selectedPriority={selectedPriority}
            setSelectedPriority={setSelectedPriority}
            register={register}
            name="priority"
          />
        </section>
        <section>
          <h2>Deadline</h2>
          <CusDatePicker control={control} name="deadline" />
        </section>
      </div>

      <Button
        className={s.btn}
        type="submit"
        buttonText={type === 'create' ? 'Create' : 'Edit'}
        icon={`${icon}#icon-plus-small`}
      />
    </form>
  );
};

export default CardForm;
