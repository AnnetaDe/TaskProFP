import { useDispatch } from 'react-redux';
import Select from 'react-select';
import { setNewFilter } from '../../redux/columns/filterSlice';

// import svg from '../../images/icons.svg';
// import css from './FilterSelect.module.css';

export const NewFilter = () => {
  const dispatch = useDispatch();
  const handleChange = ({ value }) => {
    dispatch(setNewFilter(value));
  };
  const options = [
    { value: 'showall', label: 'showAll' },
    { value: 'high', label: 'high' },
    { value: 'medium', label: 'medium' },
    { value: 'low', label: 'low' },
  ];

  return (
    <>
      filter
      <div>
        <span>Filters</span>
      </div>
      <Select
        options={options}
        placeholder=""
        onChange={value => handleChange(value)}

        // onChange={value => handleChange(value)}
        // selectProps={{
        //     handleChange,
        // }}
      />
    </>
  );
};
