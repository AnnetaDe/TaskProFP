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

const CardForm = ({
  type,
  title,
  description,
  priority,
  deadline,
  onClose,
  boardid,
  columnid,
}) => {
  const dispatch = useDispatch();

  const options = {
    create: {
    //   scheme: BoardForm,
      onSubmitThunk: createNewTaskThunk,
      defaultValues: { title: '', description: '', priority: '', deadline: '' },
    },
    edit: {
    //   scheme: BoardForm,
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
    options[type].priority
  );
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: options[type].defaultValues,
    // resolver: yupResolver(options[type].scheme),
    mode: 'onChange',
  });
  const onSubmit = data => {
    const formData = {
      boardid,
      columnid,
      task: { ...data },
    };
    dispatch(options[type].onSubmitThunk(formData));
    console.log(formData);
    onClose();
    reset();
  };

  return (
    <form
      className={s.form_styles}
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="nope"
    >
      <InputField
        type="text"
        name="title"
        placeholder="Title"
        register={register}
        errors={errors}
      />

      <section>
        <h2>Label color</h2>
        <PriorityList
          selectedIcon={selectedPriority}
          setSelectedIcon={setSelectedPriority}
          register={register}
          name="icon"
        />
      </section>
      <section>
        <h2>Deadline</h2>
        <CusDatePicker />
      </section>
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
