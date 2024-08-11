import s from './IconsList.module.css';
import icon from '../../../../images/icons.svg';
import clsx from 'clsx';
import { useEffect } from 'react';

const icons = [
  { iconName: 'icon_1', svg: `${icon}#icon-square` },
  { iconName: 'icon_2', svg: `${icon}#icon-star` },
  { iconName: 'icon_3', svg: `${icon}#icon-loading` },
  { iconName: 'icon_4', svg: `${icon}#icon-puzzle` },
  { iconName: 'icon_5', svg: `${icon}#icon-container` },
  { iconName: 'icon_6', svg: `${icon}#icon-blitz` },
  { iconName: 'icon_7', svg: `${icon}#icon-colors` },
  { iconName: 'icon_8', svg: `${icon}#icon-hexagon` },
];

const IconsList = ({ selectedIcon, setSelectedIcon , register, name}) => {
  useEffect(() => {
    if (!selectedIcon) {
      setSelectedIcon(icons[0].iconName);
    }
  }, [selectedIcon, setSelectedIcon]);
  return (
    <ul className={s.icons_list}>
      {icons.map((icon, idx) => (
        <li key={idx} className={s.icon_item}>
          <input
            type="radio"
            id={icon.iconName}
            name="icon"
            value={icon.iconName}
            checked={selectedIcon === icon.iconName}
            onClick={() => {
              setSelectedIcon(icon.iconName);
              console.log(selectedIcon);
            }}
            className={s.icon_radio}
            {...register(name)}
          />
          <label htmlFor={icon.iconName}>
            <svg
              width="18"
              height="18"
              className={clsx(s.icon_svg, {
                [s.selected]: selectedIcon === icon.iconName,
              })}
            >
              <use href={icon.svg}></use>
            </svg>
          </label>
        </li>
      ))}
    </ul>
  );
};

export default IconsList;
