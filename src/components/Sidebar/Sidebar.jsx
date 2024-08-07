
import CreateNewBoard from './CreateNewBoard/CreateNewBoard'
import MyBoards from './MyBoards/MyBoards'
import NeedHelp from './NeedHelp/NeedHelp'
import LogOut from './LogOut/LogOut'
import sprite from '../../../src/images/icons.svg';
import s from './Sidebar.module.css';


 const Sidebar = () => {
  // const dispatch = useDispatch();
  // const [isOpen, setIsOpen] = useState(false);
  


  return (
    <>
      <svg className={s.iconMenu}>
        <use href={sprite + '#icon-login'}></use>
      </svg>
      <div className={s.container}>
        <div className={s.navigation}>
          <div className={s.title}>
            <div className={s.logo}>
              <svg className={s.logoIcon}>
                <use href={sprite + '#icon-login'}></use>
              </svg>
            </div>
            <h2 className={s.mainTitle}>Task Pro</h2>
          </div>
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