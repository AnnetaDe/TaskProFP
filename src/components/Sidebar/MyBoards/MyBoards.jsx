
import s from "./MyBoards.module.css"
import sprite from "../../../images/icons.svg"


export const MyBoards = (desk) => {
  
// const deskRoute = desk.desk.title.split(' ').join('-');
const boardIcon = `#${desk.desk.icon}`;

  return (
    <>
      <div className={s.list}>
        <div className={s.item}>
          {/* <NavLink to={deskRoute} className={s.navItem}> */}
<button className={s.wrapperIcons}>
            <svg  width="18px" height="16px">
            <use href={sprite + boardIcon}></use>
            </svg>
            <p className={s.project}>{desk.desk.title}</p>
          </button>
          <div className={s.wrapperIcons}>
              <svg
                width="16px"
                height="16px"
                className={s.iconEdit}
              >
                <use href={sprite + `#icon-pencil`}></use>
              </svg>
            </div>
            <div className={s.wrapperIcons}>
              <svg
                width="16px"
                height="16px"
                className={s.iconDelete}
              >
                <use href={sprite + '#icon-trash'}></use>
              </svg>
            </div>
            </div>
      {/* </NavLink>
        </div> */}
      </div>
    </>
  );
};


