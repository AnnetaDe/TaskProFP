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
import Logo from '../Logo/Logo';
import { useMedia } from '../../hooks/useMedia';

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const selectBoards = useSelector(selectBoard);
  const { isDesktop } = useMedia();

  useEffect(() => {
    dispatch(fetchBoardsThunk());
  }, [dispatch, selectBoards]);

  const handleOutsideClick = event => {
    if (!event.target.closest('.sidebar')) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    let timeoutId;

    if (isSidebarOpen && !isDesktop) {
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
  }, [isSidebarOpen, isDesktop]);

  return (
    <>
      <div
        className={`${s.container} ${
          !isDesktop && isSidebarOpen ? s.mobile : ''
        }`}
      >
        <div className={s.navigation}>
          <Logo className={s.logo} />
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
