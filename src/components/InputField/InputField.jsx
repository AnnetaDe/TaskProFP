import clsx from 'clsx';
import s from './InputField.module.css';

const InputField = ({
  autoComplete = 'off',
  className,
  isTextArea = false,
  height,
  width,
  type = 'text',
  placeholder = 'placeholder',
  register = () => {},
  name,
  errors,
  value,
  disabled,
  defaultValue,
  ...rest
}) => {
  const style = {
    ...(height && { height }),
    ...(width && { width }),
  };

  if (isTextArea) {
    return (
      <div className={clsx(s.input_field, s.textarea_container)}>
        <textarea
          value={value}
          className={clsx(s.textarea_field)}
          placeholder={placeholder}
          style={style}
          {...(register ? register(name) : {})}
          {...rest}
        />
        <p className={s.errorStyles}>{errors[name]?.message}</p>
      </div>
    );
  }
  return (
    <label className={clsx(s.input_label)}>
      <input
        value={value}
        defaultValue={defaultValue}
        autoComplete={autoComplete}
        disabled={disabled}
        className={clsx(s.input_field, className)}
        // className={className}
        type={type}
        placeholder={placeholder}
        {...(register ? register(name) : {})}
        {...rest}
      />
      <p className={s.errorStyles}>{errors[name]?.message}</p>
    </label>
  );
};
export default InputField;
