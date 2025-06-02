import css from './CheckBox.module.css';

export const CheckBox = ({ onChange }) => {
  const handleCheckboxChange = e => {
    onChange(e.target.checked);
  };

  return (
    <div className={css.checkbox}>
      <input
        className={css.checkInput}
        type="checkbox"
        id="testCheckbox"
        onChange={handleCheckboxChange}
      />
      <label className={css.checkLabel} htmlFor="testCheckbox">
        LOGIN WITH TEST ACCOUNT
      </label>
    </div>
  );
};
