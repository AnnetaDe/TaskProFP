import { useState } from 'react';
import s from './Header.module.css';
import Select from 'react-select';
import {
  customComponents,
  customStyles,
  selectOptions,
} from './selectSettings.jsx';
import { selectUserName } from '../../redux/user/userSelectors.js';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { openModal } from '../../redux/modal/modalSlice.js';
import Modal from '../Modal/Modal.jsx';

const Header = () => {
  const dispatch = useDispatch();
  const [theme, setTheme] = useState('dark');
  //   const userName = useSelector(selectUserName);
  const userName = 'Name';
  //   const avatar = useSelector(selectUserAvatar);
  const avatar = null;
  const handleOpenModal = () => {
    dispatch(openModal());
  };
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
      <section className={s.user_info} onClick={handleOpenModal}>
        <p>{userName}</p>
        <div className={s.img_wrap}>
          <img src={avatar} alt="" />
        </div>
      </section>

      <Modal></Modal>
    </header>
  );
};
export default Header;
