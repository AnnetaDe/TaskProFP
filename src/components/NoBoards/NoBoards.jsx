import { useDispatch } from 'react-redux';
import s from './NoBoards.module.css';

export const NoBoards = () => {
  const dispatch = useDispatch();

  return (
    <div className={s.no_boards_wrap}>
      <p className={s.no_boards}>
        Before starting your project, it is essential to
        <a href="#!"> create a board </a>
        to visualize and track all the necessary tasks and milestones. This
        board serves as a powerful tool to organize the workflow and ensure
        effective collaboration among team members.
      </p>
    </div>
  );
};
