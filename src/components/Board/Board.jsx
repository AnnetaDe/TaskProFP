import { useDispatch } from 'react-redux';
import { getAllCoulumnsWithBoardIdThunk } from '../../redux/columns/columnsOperations';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectColumnsWithinBoard } from '../../redux/columns/columnsSelectors';
import { useEffect } from 'react';

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
    <div>
      {columns
        ? columns.map(column => (
            <div key={column._id}>
              {column.title}
              {'----tasks [..., ...]'}
            </div>
          ))
        : null}
    </div>
  );
};
