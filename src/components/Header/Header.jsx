import { useEffect, useState } from 'react';
import s from './Header.module.css';
import Select from 'react-select';
import {
  customComponents,
  customStyles,
  selectOptions,
} from './selectSettings.jsx';
import {
  selectAvatar,
  selectUserName,
  selectUserTheme,
} from '../../redux/user/userSelectors.js';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { openModal } from '../../redux/modal/modalSlice.js';
import Modal from '../Modal/Modal.jsx';
import { useMedia } from '../../hooks/useMedia.jsx';
import icons from '../../images/icons.svg';
import SvgIconAnonym from './SvgIconAnonym.jsx';
import { changeColorScheme } from '../../redux/themes/userPreferencesSlice.js';

const Header = () => {
  const dispatch = useDispatch();
  const [theme, setTheme] = useState(selectOptions[1]);

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const userName = useSelector(selectUserName);
  const avatar = useSelector(selectAvatar);
  const userTheme = useSelector(selectUserTheme);
  console.log(userTheme);

  const { isDesktop } = useMedia();

  const handleOpenModal = () => {
    dispatch(openModal());
  };
  const handleChange = selectedOption => {
    dispatch(changeColorScheme(selectedOption.value));
    // setTheme(selectedOption);
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
          <p>{userName ? userName : 'Anonym'}</p>
          {avatar ? (
            <div className={s.img_wrap}>
              <img src={avatar} alt={`Avatar ${userName}`} />
            </div>
          ) : (
            <div className={s.svg_wrap}>
              <div>
                <SvgIconAnonym fill="var(--user-icon-fill)" />
              </div>
            </div>
          )}
        </div>
      </section>

      <Modal>Edit User Modal</Modal>
    </header>
  );
};
export default Header;
