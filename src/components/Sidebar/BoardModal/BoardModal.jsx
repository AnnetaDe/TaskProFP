import s from './BoardModal.module.css';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import InputField from '../../InputField/InputField';
import { yupResolver } from '@hookform/resolvers/yup';
import icon from '../../../images/icons.svg';
import { Button } from '../../Button/Button';
import IconsList from './IconsList/IconsList';
import BgcList from './BgcList/BgcList';

const BoardModal = ({
  create,
  edit,
  title,
  onSubmitThunk,
  scheme,
  icons,
  chosenIcons,
  backGrounds,
  chosenBackGrounds,
}) => {
  const dispatch = useDispatch();
  const isLoading = false;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: create
      ? { title: '', icons: '', background: '' }
      : { title: title, icons: '', background: '' },
    resolver: yupResolver(scheme),
    mode: 'onChange',
  });
  const onSubmit = data => {
    console.log(data);
    console.log('submit');
    dispatch(onSubmitThunk(data));
    reset();
  };
  console.log('modal');

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
        <h2>Icons</h2>
        <IconsList icons={icons} />
      </section>
      <section>
        <h2>Background</h2>
        <BgcList backGrounds={backGrounds} />
      </section>
      <Button
        buttonText={create ? 'Create' : 'Edit'}
        icon={`${icon}#icon-plus-small`}
      />
      {/* <h2 className={s.title}>New board</h2> */}

      {/* <Formik
        initialValues={initialValues}
      >
        <Form className={s.form}>
          <label className={s.label} htmlFor="name">
            <input
              className={s.input}
              type="text"
              name="name"
              placeholder="Title"
              minLength="4"
              maxLength="12"
            />
            <ErrorMessage
              name="name" 
              component="div"
              style={{
                color: 'red',
                fontSize: 14,
              }}
            />
          </label>
        </Form>
      </Formik> */}
    </form>
  );
};

export default BoardModal;
