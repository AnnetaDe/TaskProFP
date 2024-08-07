import { useEffect, useState } from 'react';
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
import { useMedia } from '../../hooks/useMedia.jsx';
import icons from '../../images/icons.svg';

const Header = () => {
  const dispatch = useDispatch();
  const [theme, setTheme] = useState(selectOptions[1]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  //   const userName = useSelector(selectUserName);
  const userName = 'Name';
  //   const avatar = useSelector(selectUserAvatar);
  const avatar = null;

  const { isDesktop, isTablet } = useMedia();

  const handleOpenModal = () => {
    dispatch(openModal());
  };
  const handleChange = selectedOption => {
    setTheme(selectedOption);
    document.documentElement.setAttribute('theme', selectedOption.value);
  };
  useEffect(() => {
    document.documentElement.setAttribute('theme', theme.value);
  }, []);
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
    console.log(isSidebarOpen);
  };
  return (
    <header className={s.header}>
      {!isDesktop ? (
        <svg
          width="32"
          height="32"
          className={s.svg_burger}
          onClick={toggleSidebar}
        >
          <use href={`${icons}#icon-burger`}></use>
        </svg>
      ) : (
        <span></span>
      )}
      <section className={s.right}>
        <Select
          value={theme}
          onChange={handleChange}
          options={selectOptions}
          placeholder="Theme"
          styles={customStyles}
          components={customComponents}
        />
        <div className={s.user_info} onClick={handleOpenModal}>
          <p>{userName}</p>
          <div className={s.img_wrap}>
            <img src={avatar} alt="" />
          </div>
        </div>
      </section>

      <Modal>Edit User Modal</Modal>
    </header>
  );
};
export default Header;
