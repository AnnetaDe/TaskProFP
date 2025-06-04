import { components } from 'react-select';
import svg from '../images/icons.svg';
import css from '../components/FilterSelect/FilterSelect.module.css';
import { Button } from '../components/Button/Button';

const CustomMenu = props => {
  const { selectProps, closeMenu } = props;

  const handleCloseMenu = () => {
    if (selectProps && selectProps.onMenuClose) {
      selectProps.onMenuClose();
    }
  };
  const handleClick = () => {
    closeMenu();
  };



  return (
    <components.Menu {...props}>
      <div onClick={handleCloseMenu}>
        <Button
          iconSize='20'
          icon={`${svg}#icon-x-close-1`}
          typeStyle="transparent"
          type="button"
          small
          onClick={handleClick}
          className={css.closeBtn}
        >
        <svg className={css.icon_close}>
          <use href={`${svg}#icon-x-close-1`}></use>
        </svg>
      </Button>

      {props.children}
  </div>
    </components.Menu>
  );
};

export default CustomMenu;
