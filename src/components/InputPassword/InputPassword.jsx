import { useState } from "react";
import InputField from "../InputField/InputField";
import css from './InputPassword.module.css'
import icon from '../../images/icons.svg';

const InputPassword = ({register, errors={}}) => {
    const [passwordShown, setPasswordShown] = useState(false);

    const togglePasswordVisibility = () => {
      setPasswordShown(!passwordShown);
    };
  return (
    <label>
    <div className={css.passwordContainer}>
      <InputField
        type={passwordShown ? 'text' : 'password'}
        placeholder="Create a password"
        name="password"
        register={register}
      />
      <button
        type="button"
        className={css.buttonShowPassword}
        onClick={togglePasswordVisibility}
      >
        <svg width="20px" height="20px">
          <use href={icon + '#icon-eye'}></use>
        </svg>
      </button>
    </div>
    <p className={css.errorStyles}>{errors.password?.message}</p>
  </label>
  )
}
export default InputPassword