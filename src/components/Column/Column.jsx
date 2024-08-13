import { Draggable, Droppable } from '@hello-pangea/dnd';
import { Task } from '../Task/Task';
import s from './Column.module.css';
import { Button } from '../Button/Button';
import icon from '../../images/icons.svg'

export const Column = ({ column }) => {
  return (
    <li className={s.li_col}>
      <Droppable droppableId={column._id}>
        {provided => (
          <div
            className={s.columnWrapper}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <div className={s.columnTitle}>
              <p>{column.title}</p>
            </div>
            <ul className={s.column}>
              {column.tasks.map((task, index) => (
                <Draggable key={task._id} draggableId={task._id} index={index}>
                  {provided => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={s.content_draggle}
                    >
                      <Task
                        key={task.id}
                        task={task}
                        index={index}
                        className={s.task}
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
    </li>
  );
};
// <div className={s.columnWrapper}>
//   <div className={s.columnTitle}>
//     <p>{column.title}</p>
//   </div>
//   <ul className={s.column}>
//     {column.tasks.map(task => (
//       <Task key={task._id} task={task} />
//     ))}{' '}
//   </ul>
// </div>
