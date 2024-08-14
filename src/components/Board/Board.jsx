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
  selectColumnsWithinBoard,
  selectFilter,
} from '../../redux/columns/columnsSelectors';

import { useEffect, useState } from 'react';
import { Column } from '../Column/Column';
import s from './Board.module.css';
import { updateTaskThunk } from '../../redux/tasks/tasksOperations';
import { Button } from '../Button/Button';
import icon from '../../images/icons.svg';
import { selectCreateColumnOpen } from '../../redux/modal/modalSelector';
import {
  closeCreateColumnModal,
  closeEditProfileModal,
  openCreateColumnModal,
} from '../../redux/modal/modalSlice';
import Modal from '../Modal/Modal';
import ColumnForm from '../ColumnForm/ColumnForm';
import ModalWithoutRedux from '../ModalWithoutRedux/ModalWithoutRedux';
export const Board = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);
  useEffect(() => {
    console.log(filter);

    if (id) {
      dispatch(getAllCoulumnsWithBoardIdThunk(id));
    }
    if (filter) {
      dispatch(filterColumns(filter));
    }
  }, [dispatch, id, filter]);

  const boardTitle = useSelector(selectBoardTitle);
  const columns = useSelector(selectColumnsWithinBoard);

  const isCreateColumn = useSelector(selectCreateColumnOpen);
  const handleOpen = () => {
    dispatch(openCreateColumnModal());
  };
  console.log(columns);
const [isOpen, setIsOpen] = useState()
const openModal=()=>{
  setIsOpen(true)
}
const closeModal=()=>{
  setIsOpen(false)
}


  const onDragEnd = result => {
    const { source, destination } = result;
    console.log(result);

    if (!destination) {
      return;
    }

    // console.log(result.draggableId);
    dispatch(
      updateTaskOrder({
        source,
        destination,
        sourceColumnId: source.droppableId,
        destinationColumnId: destination.droppableId,
      })
    );

    // console.log(id,22222 source.droppableId, destination.droppableId)111;
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
    <div className={s.board_wrap}>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={s.boardTitle}>
          <h2>{boardTitle}</h2>
        </div>
        <div className={s.board}>
          <div className={s.boardColumn}>
          <ul >
            {columns.map(column => (
              <Column key={column._id} column={column} />
            ))}
          </ul>
          <Button
            buttonText="Add another column"
            typeStyle="secondary"
            icon={`${icon}#icon-plus-small`}
            onClick={openModal}
          />
          </div>

        </div>
      </DragDropContext>

      {isOpen && (
        <ModalWithoutRedux
          isOpen={isOpen}
          onClose={closeModal}
          title="Add column"
        >
          <ColumnForm
            onClose={closeModal}
            type="create"
            boardId={id}
          />
        </ModalWithoutRedux>
      )}
    </div>
  );
};
