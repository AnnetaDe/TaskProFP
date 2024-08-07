import clsx from 'clsx';
import s from './InputField.module.css';
const InputField = ({
  autoComplete = 'off',
  className,
  type = 'text',
  placeholder = 'placeholder',
  register = () => {},
  name,
  errors,
  ...rest
}) => {
  if (errors && errors[name]) {
    return <p className={css.errorStyles}>{errors[name].message}</p>;
  }
  return (
    <input
      autoComplete={autoComplete}
      className={clsx(s.input_field, className)}
      type={type}
      placeholder={placeholder}
      {...(register ? register(name) : {})}
      {...rest}
    />
  );
};
export default InputField;
