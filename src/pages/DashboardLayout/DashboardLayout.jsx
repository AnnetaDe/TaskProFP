import { Suspense, useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import { selectUserTheme } from '../../redux/user/userSelectors';
import { useSelector } from 'react-redux';

import s from './DashboardLayout.module.css';
import { Board } from '../../components/Board/Board';

const DashboardLayout = () => {
  const colorScheme = useSelector(selectUserTheme);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('theme', colorScheme);
  }, [colorScheme]);

  return (
    <div className={s.gridContainer}>
      <div className={s.gridSidebar}>
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </div>
      <div className={s.gridHeader}>
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
