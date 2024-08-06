import { useState } from 'react';
import s from './Header.module.css';
import Select from 'react-select';
import {
  customComponents,
  customStyles,
  selectOptions,
} from './selectSettings.jsx';

const Header = () => {
  const [theme, setTheme] = useState('dark');

  const handleChange = selectedOption => {
    setTheme(selectedOption);
    document.documentElement.setAttribute('theme', selectedOption.value);
  };

  return (
    <header className={s.header}>
      <Select
        value={theme}
        onChange={handleChange}
        options={selectOptions}
        placeholder="Theme"
        styles={customStyles}
        components={customComponents}
      />
      <section className={s.user_info}>
        <p>Name</p>
        <div className={s.img_wrap}>
          <img src="" alt="" />
        </div>
      </section>
    </header>
  );
};
export default Header;
