import s from './TaskControler.module.css';
import icons from '../../images/icons.svg';
import { useParams } from 'react-router-dom';
export const TaskControler = ({ taskid, columnid, boardid }) => {
  console.log(taskid, columnid, boardid);

  return (
    <ul className={s.taskActions}>
      <li>
        <button className={s.btn_icon}>
          <svg
            className={s.taskIcon}
            // onClick={}
          >
            <use href={`${icons}#icon-glocke`}></use>
          </svg>
        </button>
      </li>
      <li>
        <button className={s.btn_icon}>
          <svg
            className={s.taskIcon}
            // onClick={}
          >
            <use href={`${icons}#icon-arrow-circle-broken-right`}></use>
          </svg>
        </button>
      </li>
      <li>
        <button className={s.btn_icon}>
          <svg
            className={s.taskIcon}
            // onClick={}
          >
            <use href={`${icons}#icon-pencil`}></use>
          </svg>
        </button>
      </li>
      <li>
        <button className={s.btn_icon}>
          <svg
            className={s.taskIcon}
            // onClick={}
          >
            <use href={`${icons}#icon-trash`}></use>
          </svg>
        </button>
      </li>
    </ul>
  );
};
