import MyBoards from './MyBoards/MyBoards';
import NeedHelp from './NeedHelp/NeedHelp';
import LogOut from './LogOut/LogOut';
import icons from '../../images/icons.svg';
import s from './Sidebar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import CreateNewBoard from './CreateNewBoard/CreateNewBoard';
import { fetchBoardsThunk } from '../../redux/boards/boardsOperations';
import { selectBoard } from '../../redux/boards/boardsSelectors';
import { ListMyBoards } from './ListMyBoards/ListMyBoards';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 1440 });

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
              <svg className={s.logoIcon} width="12px" height="16px">
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
        <ListMyBoards />
        <div className={s.needHelp}>
          <NeedHelp />
          <LogOut />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
