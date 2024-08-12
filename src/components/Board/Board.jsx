import { DragDropContext } from '@hello-pangea/dnd';
import { useDispatch } from 'react-redux';
import { getAllCoulumnsWithBoardIdThunk } from '../../redux/columns/columnsOperations';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { updateTaskOrder } from '../../redux/columns/columnsSlice';
import {
  selectBoardTitle,
  selectColumnsOrderId,
  selectColumnsWithinBoard,
  selectTasksOrderId,
  selectTasksWithinColumn,
} from '../../redux/columns/columnsSelectors';

import { useEffect } from 'react';
import { Column } from '../Column/Column';
import s from './Board.module.css';

export const Board = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(getAllCoulumnsWithBoardIdThunk(id));
    }
  }, [dispatch, id]);

  const boardTitle = useSelector(selectBoardTitle);
  const columns = useSelector(selectColumnsWithinBoard);
  const columnOrderId = useSelector(selectColumnsOrderId);
  const tasksWithinBoard = useSelector(selectTasksWithinColumn);
  const tasksOrderId = useSelector(selectTasksOrderId);

  console.log(id);
  console.log('tasksWithinBoard', tasksWithinBoard);
  console.log('boardTitle', boardTitle);
  console.log('columns', columns);
  const onDragEnd = result => {
    const { source, destination } = result;

    // If dropped outside the list
    if (!destination) {
      return;
    }

    // Handle task reorder within a column
    if (source.droppableId === destination.droppableId) {
      dispatch(
        updateTaskOrder({
          source,
          destination,
          sourceColumnId: source.droppableId,
          destinationColumnId: destination.droppableId,
        })
      );
    } else {
      // Handle moving tasks between columns
      dispatch(
        updateTaskOrder({
          source,
          destination,
          sourceColumnId: source.droppableId,
          destinationColumnId: destination.droppableId,
        })
      );
    }
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={s.boardTitle}>
          <h2>{boardTitle}</h2>

          <div className={s.board}>
            <ul className={s.boardColumn}>
              {columns
                ? columns.map(column => (
                    <Column key={column._id} column={column} />
                  ))
                : null}
            </ul>
          </div>
        </div>
      </DragDropContext>
    </>
  );
};
