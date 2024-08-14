import Select from 'react-select';
import { useDispatch } from 'react-redux';

import { filterColumns, setFilter } from '../../redux/columns/columnsSlice';

import options from '../../helpers/optionsForFilterSelect';
import CustomOption from '../../helpers/CustomOptionsForFilterSelect';
import CustomMenu from '../../helpers/CustomMenuForFilterSelect';
import customStyles from '../../helpers/customStylesForFilterSelect';

import svg from '../../images/icons.svg';
import css from './FilterSelect.module.css';

const FilterSelect = () => {
  const dispatch = useDispatch();

  const handleChange = ({ value }, selectProps) => {
    dispatch(setFilter(value));
    dispatch(filterColumns(value));

    if (selectProps && selectProps.onMenuClose) {
      selectProps.onMenuClose();
    }
  };

  return (
    <>
      <div className={css.container}>
        <svg className={css.icon_filter}>
          <use href={`${svg}#icon-filter-1`}></use>
        </svg>
        <span className={css.text}>Filters</span>
      </div>
      <Select
        options={options}
        styles={customStyles}
        placeholder=""
        components={{ Option: CustomOption, Menu: CustomMenu }}
        onChange={value => handleChange(value)}
        selectProps={{
          handleChange,
        }}
      />
    </>
  );
};

export default FilterSelect;
