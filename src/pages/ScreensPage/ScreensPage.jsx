import { useSelector } from 'react-redux';
import { Board } from '../../components/Board/Board';
import { selectBoards } from '../../redux/boards/boardsSelectors';
import s from './ScreensPage.module.css';
import { NoBoards } from '../../components/NoBoards/NoBoards';

const ScreensPage = () => {
  const boards = useSelector(selectBoards);

  return (
    <div className={s.screen_page}>
      {boards.length > 0 ? <Board /> : <NoBoards />}
    </div>
  );
};

export default ScreensPage;
