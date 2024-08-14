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
  selectFilteredColumns,
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
  const filteredColumns = useSelector(selectFilteredColumns);
  const columnOrderId = useSelector(selectColumnsOrderId);
  const tasksWithinBoard = useSelector(selectTasksWithinColumn);
  const tasksOrderId = useSelector(selectTasksOrderId);

  const onDragEnd = result => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }

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
      <DragDropContext onDragEnd={onDragEnd} className={s.board_wrap}>
        <div className={s.boardTitle}>
          <h2>{boardTitle}</h2>
        </div>
        <div className={s.board}>
          <ul className={s.boardColumn}>
            {!filteredColumns.length
              ? columns.map(column => (
                  <Column key={column._id} column={column} />
                ))
              : filteredColumns.map(column => (
                  <Column key={column._id} column={column} />
                ))}
          </ul>
        </div>
      </DragDropContext>
    </>
  );
};
