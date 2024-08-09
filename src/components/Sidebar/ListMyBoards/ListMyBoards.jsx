import { useSelector } from 'react-redux';
import { selectBoard } from '../../../redux/boards/boardsSelectors';
import s from './ListMyBoards.module.css';

export const ListMyBoards = () => {
  const myBoards = useSelector(selectBoard);
  console.log(myBoards);
  return (
    <div>
      {' '}
      ListMyBoards
      <ul className={s.menuList}>
        {myBoards.map(item => (
          <li key={item._id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};
