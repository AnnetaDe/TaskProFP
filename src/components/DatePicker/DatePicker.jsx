import { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CustomInputCalendar from './CustomInputCalendar';
import { format } from 'date-fns';
import { Controller } from 'react-hook-form';

const CusDatePicker = ({ selectedDeadline, control, name, ...props }) => {
  const [startDate, setStartDate] = useState(
    selectedDeadline ? new Date(selectedDeadline) : new Date()
  );

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value, ref } }) => (
        <ReactDatePicker
          selected={startDate}
          onChange={date => {
            if (date) {
              const formattedDate = format(date, 'yyyy-MM-dd');
              console.log('Selected date:', formattedDate); // Log the selected date
              onChange(formattedDate); // Pass the formatted date to react-hook-form
              setStartDate(date); // Update local state
            } else {
              onChange(''); // Handle date clearing
              setStartDate(null); // Reset local state if cleared
            }
          }}
          dateFormat="eeee, dd MMMM"
          minDate={new Date()}
          customInput={<CustomInputCalendar />}
          ref={ref}
          {...props}
        />
      )}
    />
  );
};

CusDatePicker.displayName = 'CusDatePicker';

export default CusDatePicker;
