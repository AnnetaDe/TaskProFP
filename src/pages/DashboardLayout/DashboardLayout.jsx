import { useEffect } from 'react';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import { selectUserTheme } from '../../redux/user/userSelectors';
import { useSelector } from 'react-redux';

const DashboardLayout = () => {
  const colorScheme = useSelector(selectUserTheme);
  useEffect(() => {
    document.documentElement.setAttribute('theme', colorScheme);
  }, [colorScheme]);
  return (
    <div>
      <Header />
      {/* <Sidebar/> */}
      Dashboard
    </div>
  );
};
export default DashboardLayout;
