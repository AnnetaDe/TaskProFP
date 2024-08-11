import MyBoards from './MyBoards/MyBoards';
import NeedHelp from './NeedHelp/NeedHelp';
import LogOut from './LogOut/LogOut';
import s from './Sidebar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import CreateNewBoard from './CreateNewBoard/CreateNewBoard';
import { fetchBoardsThunk } from '../../redux/boards/boardsOperations';
import { selectBoard } from '../../redux/boards/boardsSelectors';
import Logo from '../Logo/Logo';
import { useMedia } from '../../hooks/useMedia';
import { ListMyBoards } from './ListMyBoards/ListMyBoards';
const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const selectBoards = useSelector(selectBoard);
  const { isDesktop } = useMedia();

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
      {!isDesktop && isSidebarOpen && (
        <div className={s.backdrop} onClick={() => setIsSidebarOpen(false)} />
      )}
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
