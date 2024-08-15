import { Draggable, Droppable } from '@hello-pangea/dnd';
import { Task } from '../Task/Task';
import s from './Column.module.css';
import { Button } from '../Button/Button';
import icon from '../../images/icons.svg';
import ColumnTitle from '../ColumnTitle/ColumnTitle';

export const Column = ({ column, boardid }) => {
  const columnid = column._id;

  return (
    <li className={s.li_col}>
      <Droppable droppableId={column._id}>
        {provided => (
          <div
            className={s.columnWrapper}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <ColumnTitle title={column.title} columnId={column._id} />
            <ul className={s.column}>
              {column.tasks.map((task, index) => (
                <Draggable key={task._id} draggableId={task._id} index={index}>
                  {provided => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Task
                        key={task.id}
                        task={task}
                        index={index}
                        columnid={columnid}
                        boardid={boardid}
                      />
                    </div>
                  )}
                </Draggable>
              ))}

              <Button
                icon={`${icon}#icon-plus-big`}
                className={s.btn_column}
                width="100%"
                typeStyle="primary"
                buttonText="Add another card"
              />
            </ul>
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <Button
        className={s.btn_column}
        typeStyle="secondary"
        buttonText="Add another card"
      />
    </li>
  );
};
