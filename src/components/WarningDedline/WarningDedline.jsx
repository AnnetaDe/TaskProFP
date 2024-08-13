import icon from '../../images/icons.svg';
import css from "./WarningDedline.module.css"
const WarningDedline = ()=>{
return(
    <svg width="18" height="18" className={css.icon}>
            <use href={`${icon}#icon-bell`}></use>
          </svg>
)







}
export  default WarningDedline;