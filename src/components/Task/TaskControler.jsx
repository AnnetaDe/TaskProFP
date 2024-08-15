import s from './TaskControler.module.css';
import icons from '../../images/icons.svg';
export const TaskControler = () => {
  return (
    <ul className={s.taskActions}>
      <li>
        <svg
          className={s.taskIcon}
          // onClick={}
        >
          <use href={`${icons}#icon-glocke`}></use>
        </svg>
      </li>
      <li>
        <svg
          className={s.taskIcon}
          // onClick={}
        >
          <use href={`${icons}#icon-arrow-circle-broken-right`}></use>
        </svg>
      </li>
      <li>
        <svg
          className={s.taskIcon}
          // onClick={}
        >
          <use href={`${icons}#icon-pencil`}></use>
        </svg>
      </li>
      <li>
        <svg
          className={s.taskIcon}
          // onClick={}
        >
          <use href={`${icons}#icon-trash`}></use>
        </svg>
      </li>
    </ul>
  );
};
