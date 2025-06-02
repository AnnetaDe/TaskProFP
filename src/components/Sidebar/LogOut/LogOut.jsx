import { useDispatch } from 'react-redux';
import icon from '../../../images/icons.svg';
import s from './LogOut.module.css';

import { logoutThunk } from '../../../redux/user/userOperations';
import { setTheme } from '../../../redux/user/userSlice';

const LogOut = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutThunk());
    dispatch(setTheme('dark'));
  };
  return (
    <button className={s.btn} type="button" onClick={() => handleLogout()}>
      <svg className={s.icon} width="32px" height="32px">
        <use href={icon + '#icon-logout'}></use>
      </svg>
      Log out
    </button>
  );
};

export default LogOut;
