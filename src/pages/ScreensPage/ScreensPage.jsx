import { useSelector } from 'react-redux';
import { Board } from '../../components/Board/Board';
import { selectBoard } from '../../redux/boards/boardsSelectors';
import s from './ScreensPage.module.css';
import { useParams } from 'react-router-dom';
export const ScreensPage = () => {
  const boards = useSelector(selectBoard);
  const { id } = useParams();
console.log(boards, 'boards');

  return (
    <div className={s.screen_page}>
      {id && boards.length ? (
        <Board />
      ) : (
        <div className={s.no_boards}>
          Before starting your project, it is essential to visualize and track
          all the necessary tasks and milestones. This board serves as a
          powerful tool to organize the workflow and ensure effective
          collaboration among team members.
        </div>
      )}
    </div>
  );
};

export default ScreensPage;
