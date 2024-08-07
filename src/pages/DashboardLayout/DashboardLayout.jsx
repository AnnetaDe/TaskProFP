import { useEffect } from 'react';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import { selectUserTheme } from '../../redux/user/userSelectors';
import { useSelector } from 'react-redux';
import {
  createBoardThunk,
  fetchBoardsThunk,
} from '../../redux/boards/boardsOperations';
import { useDispatch } from 'react-redux';

const DashboardLayout = () => {
  const colorScheme = useSelector(selectUserTheme);
  useEffect(() => {
    document.documentElement.setAttribute('theme', colorScheme);
  }, [colorScheme]);
  const dispatch = useDispatch();
  dispatch(fetchBoardsThunk());

  return (
    <div>
      <Header />
      {/* <Sidebar/> */}
      Dashboard
    </div>
  );
};
export default DashboardLayout;
