import { useSelector } from 'react-redux';
import { Board } from '../../components/Board/Board';
import { selectBoard } from '../../redux/boards/boardsSelectors';
import s from './ScreensPage.module.css';
import { useParams } from 'react-router-dom';
import { NoBoards } from '../../components/NoBoards/NoBoards';

export const ScreensPage = () => {
  const boards = useSelector(selectBoard);
  const { id } = useParams();

  return (
    <div className={s.screen_page}>
      {id && boards.length ? (
        <Board />
      ) : (
        <div className={s.no_boards}>
          <NoBoards />
        </div>
      )}
    </div>
  );
};

export default ScreensPage;
