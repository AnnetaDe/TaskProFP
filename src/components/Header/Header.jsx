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
import { updateUserPreferencesThunk } from '../../redux/user/userOperations.js';
import EditModal from '../EditModal/EditModal.jsx';
import { createPortal } from 'react-dom';
import { selectModal } from '../../redux/modal/modalSelector.js';

const Header = () => {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  const avatar = useSelector(selectAvatar);
  const userTheme = useSelector(selectUserTheme);
  const [theme, setTheme] = useState(
    selectOptions.filter(el => el.value === userTheme)
  );

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const { isDesktop } = useMedia();
  const openedModal = useSelector(selectModal);

  const handleOpenModal = () => {
    dispatch(openModal());
  };
  const handleChange = selectedOption => {
    setTheme(selectedOption);
    dispatch(updateUserPreferencesThunk({ theme: selectedOption.value }));
    document.documentElement.setAttribute('theme', selectedOption.value);
  };
  useEffect(() => {
    document.documentElement.setAttribute('theme', theme.value);
  }, [theme.value]);

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
          isOptionSelected={true}
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
      {openedModal &&
        createPortal(
          <Modal title="Edit profile">
            <EditModal />
          </Modal>,
          document.body
        )}

      {/* <Modal title='Edit profile'><EditModal /></Modal> */}
    </header>
  );
};
export default Header;
