import { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CustomInputCalendar from './CustomInputCalendar';
// import css from './DatePicker.module.css';
const CusDatePicker = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div>
      <ReactDatePicker
        selected={startDate}
        onChange={date => {
          setStartDate(date);
          setFieldValue('dedlineDate', date);
        }}
        dateFormat="eeee,dd MMMM"
        // className={s.dateInput}
        customInput={<CustomInputCalendar />}
      />
    </div>
  );
};

export default CusDatePicker;
