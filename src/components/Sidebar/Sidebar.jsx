import MyBoards from './MyBoards/MyBoards';
import NeedHelp from './NeedHelp/NeedHelp';
import LogOut from './LogOut/LogOut';
import icons from '../../images/icons.svg';
import s from './Sidebar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectBoard } from '../../redux/user/userSelectors';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { fetchBoardsThunk } from '../../redux/boards/boardsOperations';
import CreateNewBoard from './CreateNewBoard/CreateNewBoard';

const Sidebar = () => {
  const dispatch = useDispatch();
  const selectBoards = useSelector(selectBoard);
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 1440 });

  useEffect(() => {
    dispatch(fetchBoardsThunk());
  }, [dispatch, selectBoards]);

  const handleToggleSidebar = () => {
    setIsOpen(prevState => !prevState);
  };

  const handleOutsideClick = event => {
    if (!event.target.closest('.sidebar')) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    let timeoutId;

    if (isOpen && isMobile) {
      timeoutId = setTimeout(() => {
        document.addEventListener('click', handleOutsideClick);
      }, 100);
    } else {
      document.removeEventListener('click', handleOutsideClick);
    }

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isOpen, isMobile]);

  return (
    <>
      <svg className={s.iconMenu} onClick={handleToggleSidebar}>
        <use href={`${icons}#icon-burger`}></use>
      </svg>
      <div className={`${s.container} ${isMobile && isOpen ? s.mobile : ''}`}>
        <div className={s.navigation}>
          <div className={s.title}>
            <div className={s.logo}>
              <svg className={s.logoIcon}>
                <use href={`${icons}#icon-Logo-task-Pro`}></use>
              </svg>
            </div>
            <h2 className={s.mainTitle}>Task Pro</h2>
          </div>
          <CreateNewBoard />
        </div>
        <nav className={s.dashboards}>
          <MyBoards />
        </nav>
        <div className={s.needHelp}>
          <NeedHelp />
          <LogOut />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
