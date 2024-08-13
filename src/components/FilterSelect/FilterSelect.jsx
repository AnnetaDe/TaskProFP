import { useDispatch } from 'react-redux';

import { filterColumns, setFilter } from '../../redux/columns/columnsSlice';

import css from './FilterSelect.module.css';

const FilterSelect = () => {
  const dispatch = useDispatch();

  const handleChange = value => {
    dispatch(setFilter(value));
    dispatch(filterColumns(value));
  };

  return (
    <select
      className={css.select}
      onChange={event => handleChange(event.target.value)}
    >
      <option value="without_priority">Without priority</option>
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
      <option value="all">Show all</option>
    </select>
  );
};

export default FilterSelect;
