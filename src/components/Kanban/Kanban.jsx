import { useDispatch } from 'react-redux';
import { fetchBoardsThunk } from '../../redux/boards/boardsOperations';
import { useEffect } from 'react';

const Kanban = () => {
  const dispatch = useDispatch();
  //   useEffect(() => {
  //     dispatch(fetchBoardsThunk());
  //   }, [dispatch]);

  return <div>Kanban</div>;
};
export default Kanban;
