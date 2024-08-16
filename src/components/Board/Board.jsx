import { DragDropContext } from '@hello-pangea/dnd';
import { useDispatch } from 'react-redux';
import { getAllCoulumnsWithBoardIdThunk } from '../../redux/columns/columnsOperations';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  // filterColumns,
  updateTaskOrder,
} from '../../redux/columns/columnsSlice';
import {
  selectBoardBackground,
  selectBoardIcon,
  selectBoardTitle,
  selectCurrentBoardId,
  selectFilteredTasks,
  // selectFilter,
  // selectFilteredColumns,
} from '../../redux/columns/columnsSelectors';
import icon from '../../images/icons.svg';

import { useEffect, useState } from 'react';
import { Column } from '../Column/Column';
import s from './Board.module.css';
import { updateTaskThunk } from '../../redux/tasks/tasksOperations';
import { Button } from '../Button/Button';
import ModalWithoutRedux from '../ModalWithoutRedux/ModalWithoutRedux';
import ColumnForm from '../ColumnForm/ColumnForm';
import { updateBoardThunk } from '../../redux/boards/boardsOperations';
import { NewFilter } from '../NewFilter/NewFilter';
import FilterSelect from '../FilterSelect/FilterSelect';

export const Board = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  // const filter = useSelector(selectFilter);
  // const filteredColumns = useSelector(selectFilteredColumns);

  const currentBoardId = useSelector(selectCurrentBoardId);
  // const boardId = currentBoardId ? currentBoardId : id;
  // console.log(boardId);
  useEffect(() => {
    // if (Object.entries(currentBoardId).length) {
    //   dispatch(getAllCoulumnsWithBoardIdThunk(currentBoardId));
    // } else {
    //   dispatch(getAllCoulumnsWithBoardIdThunk(id));
    // }

    // if (filter) {
    //   dispatch(filterColumns(filter));
    // }

    dispatch(getAllCoulumnsWithBoardIdThunk(id));
  }, [dispatch, id]);

  const boardTitle = useSelector(selectBoardTitle);
  const columns = useSelector(selectFilteredTasks);
  const backgroundImg = useSelector(selectBoardBackground);

  const getBackgroundImage = () => {
    if (!backgroundImg) return '';

    const { mobile, tablet, desktop } = backgroundImg;
    const width = window.innerWidth;

    if (width <= 768) {
      return mobile;
    } else if (width <= 1440) {
      return tablet;
    } else {
      return desktop;
    }
  };
  const backgroundImage = getBackgroundImage();
  const [isOpen, setIsOpen] = useState();
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
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
    console.log(result);
    dispatch(
      updateTaskThunk({
        boardid: id,
        columnid: source.droppableId,
        taskid: result.draggableId,
        body: { columnId: destination.droppableId },
      })
    );
  };

  return (
    <div
      className={s.board_wrap}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* <NewFilter /> */}
      <FilterSelect />

      <div className={s.nested_wrap}>
        <DragDropContext onDragEnd={onDragEnd} className={s.board_wrap}>
          <div className={s.boardTitle}>
            <h2>{boardTitle}</h2>
          </div>
          <div className={s.board}>
            <ul>
              {columns.map(column => (
                <Column key={column._id} column={column} />
              ))}
            </ul>
            <Button
              buttonText="Add another column"
              onClick={openModal}
              typeStyle="secondary"
              icon={`${icon}#icon-plus-big`}
            />
          </div>
        </DragDropContext>
      </div>

      {isOpen && (
        <ModalWithoutRedux
          isOpen={isOpen}
          onClose={closeModal}
          title="Add another column"
        >
          <ColumnForm onClose={closeModal} type="create" boardid={id} />
        </ModalWithoutRedux>
      )}
    </div>
  );
};
