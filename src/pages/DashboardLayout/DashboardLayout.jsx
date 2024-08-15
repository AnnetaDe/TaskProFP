import { Suspense, useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import { selectUserTheme } from '../../redux/user/userSelectors';
import { useSelector } from 'react-redux';

import s from './DashboardLayout.module.css';
import { Board } from '../../components/Board/Board';
import ScreensPage from '../ScreensPage/ScreensPage';
import { useDispatch } from 'react-redux';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import FilterSelect from '../../components/FilterSelect/FilterSelect';
import { selectBoard } from '../../redux/boards/boardsSelectors';

const DashboardLayout = () => {
  const colorScheme = useSelector(selectUserTheme);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const boards = useSelector(selectBoard);
  const path = useLocation().pathname;

  console.log(boards, path);

  useEffect(() => {
    document.documentElement.setAttribute('theme', colorScheme);
    if (path === '/' && boards.length) {
      const id = boards[0]._id;
      const navigationToBoard = async () => {
        try {
          navigate(`/board/${id}`);
        } catch (error) {
          console.log(error);
        }
      };
      navigationToBoard();
    }
  }, [colorScheme, navigate, path, boards]);

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
        {/* <FilterSelect /> */}
        <div className={s.outlet}>
          <Suspense fallback="suspense">
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  );
};
export default DashboardLayout;
