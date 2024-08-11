import { useDispatch } from 'react-redux';
import { getAllCoulumnsWithBoardIdThunk } from '../../redux/columns/columnsOperations';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectColumnsWithinBoard } from '../../redux/columns/columnsSelectors';
import { useEffect } from 'react';
import { Column } from '../Column/Column';
import s from './Board.module.css';

export const Board = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    if (id) {
      dispatch(getAllCoulumnsWithBoardIdThunk(id));
    }
  }, [dispatch, id]);
  const columns = useSelector(selectColumnsWithinBoard);
  console.log('columns', columns);

  return (
    <div className={s.board}>
      <ul className={s.boardColumn}>
        {columns
          ? columns.map(column => <Column key={column._id} column={column} />)
          : null}
      </ul>
    </div>
  );
};
