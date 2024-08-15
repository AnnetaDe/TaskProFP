import { DragDropContext } from '@hello-pangea/dnd';
import { useDispatch } from 'react-redux';
import { getAllCoulumnsWithBoardIdThunk } from '../../redux/columns/columnsOperations';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  filterColumns,
  updateTaskOrder,
} from '../../redux/columns/columnsSlice';
import {
  selectBoardTitle,
  selectColumnsOrderId,
  selectColumnsWithinBoard,
  selectFilter,
  selectfilteredColumns,
  selectTasksOrderId,
  selectTasksWithinColumn,
} from '../../redux/columns/columnsSelectors';

import { useEffect } from 'react';
import { Column } from '../Column/Column';
import s from './Board.module.css';
import { updateTaskThunk } from '../../redux/tasks/tasksOperations';

export const Board = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);
  const filteredColumns = useSelector(selectfilteredColumns);

  useEffect(() => {
    if (id) {
      dispatch(getAllCoulumnsWithBoardIdThunk(id));
    }

    if (filter) {
      dispatch(filterColumns(filter));
    }
  }, [dispatch, id]);

  const boardTitle = useSelector(selectBoardTitle);
  const columns = useSelector(selectColumnsWithinBoard);

  const onDragEnd = result => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    dispatch(
      updateTaskOrder({
        source,
        destination,
        sourceColumnId: source.droppableId,
        destinationColumnId: destination.droppableId,
      })
    );

    dispatch(
      updateTaskThunk({
        boardid: id,
        columnid: source.droppableId,
        taskid: result.draggableId,
        body: { columnId: destination.droppableId },
      })
    );

    // if (source.droppableId === destination.droppableId) {
    //   dispatch(
    //     updateTaskOrder({
    //       source,
    //       destination,
    //       sourceColumnId: source.droppableId,
    //       destinationColumnId: destination.droppableId,
    //     })
    //   );
    // } else {
    //   dispatch(
    //     updateTaskOrder({
    //       source,
    //       destination,
    //       sourceColumnId: source.droppableId,
    //       destinationColumnId: destination.droppableId,
    //     })
    //   );
    // }
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd} className={s.board_wrap}>
        <div className={s.boardTitle}>
          <h2>{boardTitle}</h2>
        </div>
        <div className={s.board}>
          <ul>
            {filter
              ? filteredColumns.map(column => (
                  <Column key={column._id} column={column} />
                ))
              : columns.map(column => (
                  <Column key={column._id} column={column} />
                ))}
          </ul>
        </div>
      </DragDropContext>
    </>
  );
};
