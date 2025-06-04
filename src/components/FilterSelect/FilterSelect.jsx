import { useState } from 'react';
import Select from 'react-select';
import { useDispatch } from 'react-redux';
import { setNewFilter } from '../../redux/columns/filterSlice';
import CustomOption from '../../helpers/CustomOptionsForFilterSelect';
import CustomMenu from '../../helpers/CustomMenuForFilterSelect';
import customStyles from '../../helpers/customStylesForFilterSelect';
import svg from '../../images/icons.svg';
import css from './FilterSelect.module.css';
import { Button } from '../Button/Button';

// Define your select options here
const selectOptions = [
  {
    value: 'none',
    label: 'Without priority',
    color: '#bdbdbd',
  },
  { value: 'low', label: 'Low', color: '#8fa1d0' },
  { value: 'medium', label: 'Medium', color: '#e09cb5' },
  { value: 'high', label: 'High', color: '#bedbb0' },
  { value: 'all', label: 'All', color: '#ff4d4f' },
];


const FilterSelect = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(selectOptions[0]);
  const toggleFilter = () => {
    setIsOpen(prev => !prev);
  }
  const isActive = selected.value !== 'none' || isOpen;

  const handleChange = (selectedOption) => {
    setSelected(selectedOption);
    dispatch(setNewFilter(selectedOption.value));
    setIsOpen(false);
  };

  return (
    <>
    <div className={css.wrapper}>
      <Button
      iconSize='20'
        icon={`${svg}#icon-filter-1`}
        typeStyle="transparent"
        type="button"
      small
      onClick={toggleFilter}
      aria-label="Toggle filter"
      className={`${css.filterBtn} ${isActive ? css.active : ''}`}
      >
        <svg className={css.icon_filter}>
          <use href={`${svg}#icon-filter-1`}></use>
        </svg>
        <span>Filters</span>
      </Button>
  </div>
      {isOpen && (
        <div className="absolute top-[110%] left-0 z-50 min-w-[150px]">
          <Select
            value={selected}
            options={selectOptions}
            styles={customStyles}
            components={{ Option: CustomOption, Menu: CustomMenu }}
            onChange={handleChange}
            menuIsOpen={isOpen}
            
            closeMenuOnSelect={true}
            
            onMenuClose={() => setIsOpen(false)}
          />
        </div>
      )}
  
    </>
  );
};

export default FilterSelect;
