import {useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import { selectUserTheme } from '../../redux/user/userSelectors';
import { useSelector } from 'react-redux';

import s from './DashboardLayout.module.css';

import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { selectBoards } from '../../redux/boards/boardsSelectors';

const DashboardLayout = () => {
  const colorScheme = useSelector(selectUserTheme);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const boards = useSelector(selectBoards);
  const path = useLocation().pathname;

  useEffect(() => {
    document.documentElement.setAttribute('theme', colorScheme);
  }, [colorScheme]);
  
  useEffect(() => {
    if (path === '/' && boards.length > 0) {
      const id = boards[0]?._id;
      if (id) {
        navigate(`/board/${id}`, { replace: true });
      }
    }
  }, [navigate, path, boards]);

  return (
    <div className={s.gridContainer}>
      <div className={s.gridSidebar}>
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </div>
      <div className={s.rightSide}>
        <Header
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <div className={s.outlet}>
     
            <Outlet />
        </div>
      </div>
    </div>
  );
};
export default DashboardLayout;
