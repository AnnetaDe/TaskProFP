import MyBoards from './MyBoards/MyBoards';
import NeedHelp from './NeedHelp/NeedHelp';
import LogOut from './LogOut/LogOut';
import icons from '../../images/icons.svg';
import s from './Sidebar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import CreateNewBoard from './CreateNewBoard/CreateNewBoard';
import { fetchBoardsThunk } from '../../redux/boards/boardsOperations';
import { selectBoard } from '../../redux/boards/boardsSelectors';
import { useMedia } from '../../hooks/useMedia';

const Sidebar = () => {
  const dispatch = useDispatch();
  const selectBoards = useSelector(selectBoard);
  const [isOpen, setIsOpen] = useState(false);
  const { isMobile, isTablet } = useMedia();

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
  }, [isOpen, isMobile, isTablet]);

  return (
    <>
      <svg className={s.iconMenu} onClick={handleToggleSidebar}>
        <use href={`${icons}#icon-burger`}></use>
      </svg>
      {(isMobile || isTablet) && isOpen  && (
        <div className={s.backdrop} onClick={handleToggleSidebar}></div>
      )}
      <div className={`${s.container} ${  (isMobile || isTablet) && isOpen ? s.mobile : ''}`}>
        <div className={s.navigation}>
          <div className={s.title}>
            <div className={s.logo}>
              <svg className={s.logoIcon}  width="12px" height="16px">
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
