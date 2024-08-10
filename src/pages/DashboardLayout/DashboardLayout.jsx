import { useEffect } from 'react';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import { selectUserTheme } from '../../redux/user/userSelectors';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Kanban from '../../components/Kanban/Kanban';

const DashboardLayout = () => {
  const colorScheme = useSelector(selectUserTheme);
  const dispatch = useDispatch();
  useEffect(() => {
    document.documentElement.setAttribute('theme', colorScheme);
  }, [colorScheme, dispatch]);

  console.log(colorScheme);

  return (
    <div>
      <Header />
      <Sidebar />

      <Kanban />
    </div>
  );
};
export default DashboardLayout;
