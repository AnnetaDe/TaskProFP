import { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import { selectUserTheme } from '../../redux/user/userSelectors';
import { useSelector } from 'react-redux';
import { fetchBoardsThunk } from '../../redux/boards/boardsOperations';
import { useDispatch } from 'react-redux';
import s from './DashboardLayout.module.css';
import { Board } from '../../components/Board/Board';

const DashboardLayout = () => {
  const colorScheme = useSelector(selectUserTheme);
  useEffect(() => {
    document.documentElement.setAttribute('theme', colorScheme);
  }, [colorScheme]);
  console.log(colorScheme);
  const dispatch = useDispatch();
  dispatch(fetchBoardsThunk());
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className={s.dashboard_layout}>
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className={s.right_side}>
        <Header
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        Dashboard
        <Board />
      </div>
    </div>
  );
};
export default DashboardLayout;
