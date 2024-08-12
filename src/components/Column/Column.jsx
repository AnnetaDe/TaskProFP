import { Draggable, Droppable } from '@hello-pangea/dnd';
import { Task } from '../Task/Task';
import s from './Column.module.css';
import { Button } from '../Button/Button';

export const Column = ({ column }) => {
  return (
    <li  className={s.li_col}>
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
                    >
                      <Task key={task.id} task={task} index={index} />
                    </div>
                  )}
                </Draggable>
              ))}
            </ul>
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <Button className={s.btn_column} typeStyle="secondary" buttonText="Add another card" />
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
