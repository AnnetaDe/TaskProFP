import Select from 'react-select';
import { components } from 'react-select';
import { useDispatch } from 'react-redux';

import { filterColumns, setFilter } from '../../redux/columns/columnsSlice';

import css from './FilterSelect.module.css';
import svg from '../../images/icons.svg';

const FilterSelect = () => {
  const dispatch = useDispatch();

  const handleChange = ({ value }) => {
    dispatch(setFilter(value));
    dispatch(filterColumns(value));
  };

  const CustomOption = props => {
    const isSelected = props.isSelected;

    return (
      <components.Option {...props}>
        <div style={{ display: 'flex', alignItems: 'center', height: '20px' }}>
          <div
            style={{
              display: 'inline-block',
              width: '20px',
              height: '20px',
              position: 'relative',
              marginRight: '8px',
              borderRadius: '50%',
              border: isSelected ? `1px solid ${props.data.color}` : 'none',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                backgroundColor: props.data.color,
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%) ${
                  isSelected ? 'scale(0.7)' : 'scale(1)'
                }`,
              }}
            ></div>
          </div>
          <div style={{ flex: '1', lineHeight: '20px' }}>{props.children}</div>
        </div>
      </components.Option>
    );
  };

  const CustomMenu = props => (
    <components.Menu {...props}>
      <div className={css.menuHeader}>
        <div className={css.filtersTitle}>Filters</div>
        <div className={css.separator}></div>
        <div className={css.labelTitle}>Label color</div>
      </div>
      {props.children}
      <div className={css.selectAllContainer}>
        <button
          className={css.selectAllButton}
          onClick={() => handleChange({ value: 'all' })}
        >
          Show all
        </button>
      </div>
    </components.Menu>
  );

  const options = [
    {
      value: 'none',
      label: 'Without priority',
      color: 'rgba(255, 255, 255, 0.3)',
    },
    { value: 'low', label: 'Low', color: '#8fa1d0' },
    { value: 'medium', label: 'Medium', color: '#e09cb5' },
    { value: 'high', label: 'High', color: '#bedbb0' },
  ];

  const customStyles = {
    control: () => ({
      width: '64px',
      height: '20px',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      position: 'absolute',
      top: '12px',
      right: '24px',
    }),
    indicatorsContainer: () => ({
      display: 'none',
    }),
    input: () => ({
      pointerEvents: 'none',
      caretColor: 'transparent',
    }),
    menu: () => ({
      textAlign: 'left',
      border: '1px solid rgba(190, 219, 176, 0.5)',
      borderRadius: '8px',
      width: '300px',
      height: '234px',
      padding: '24px',
      position: 'absolute',
      top: '38px',
      right: '20px',
    }),
    menuList: () => ({
      position: 'absolute',
      bottom: '30px',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      width: '110px',
      height: '96px',
    }),
    option: (styles, state) => ({
      fontFamily: 'Poppins, sans-serif',
      fontWeight: '400',
      fontSize: '12px',
      letterSpacing: '-0.02em',
      color: state.isSelected ? '#fff' : 'rgba(255, 255, 255, 0.5)',
      ':hover': {
        color: state.isSelected ? '#fff' : 'rgba(255, 255, 255, 0.6)',
      },
      cursor: 'pointer',
      minWidth: '23px',
      maxWidth: '110px',
    }),
    singleValue: () => ({
      display: 'none',
    }),
  };

  return (
    <>
      <div className={css.container}>
        {/*<svg className={css.icon_close}>
          <use href={`${svg}#icon-x-close`}></use>
        </svg>*/}
        <svg className={css.icon}>
          <use href={`${svg}#icon-filter`}></use>
        </svg>
        <span className={css.text}>Filters</span>
      </div>
      <Select
        options={options}
        styles={customStyles}
        placeholder=""
        components={{ Option: CustomOption, Menu: CustomMenu }}
        onChange={value => handleChange(value)}
      />
    </>
  );
};

export default FilterSelect;
