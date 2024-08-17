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
import { useMedia } from '../../hooks/useMedia';
import {getBackgroundImage} from '../../helpers/getBackgroundImage.js';
export const Board = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  // const filter = useSelector(selectFilter);
  // const filteredColumns = useSelector(selectFilteredColumns);

  const currentBoardId = useSelector(selectCurrentBoardId);
  const boardId = Object.entries(currentBoardId).length ? currentBoardId : id;

  useEffect(() => {
    if (boardId && Object.entries(boardId).length > 0) {
      dispatch(getAllCoulumnsWithBoardIdThunk(boardId));
    }
  }, [boardId, dispatch]);


  const boardTitle = useSelector(selectBoardTitle);
  const columns = useSelector(selectFilteredTasks);
  const backgroundImg = useSelector(selectBoardBackground);
  const { isMobile, isTablet, isDesktop } = useMedia();

  const backgroundImage = getBackgroundImage(
    backgroundImg,
    isMobile,
    isTablet,
    isDesktop
  );
  const [isOpen, setIsOpen] = useState(false);
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
      <FilterSelect className={s.filter_select} />

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
