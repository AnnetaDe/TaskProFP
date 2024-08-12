import React, { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CustomInputCalendar from './CustomInputCalendar';
import { format } from 'date-fns';
import { Controller } from 'react-hook-form';

const CusDatePicker = ({selectedDeadline, control, name, ...props }) => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value, ref } }) => (
        <ReactDatePicker
          selected={selectedDeadline ? new Date(selectedDeadline) : startDate}
          onChange={date => {
            if (date) {
              const formattedDate = format(date, 'yyyy-MM-dd');
              onChange(formattedDate); 
              setStartDate(date)
            } else {
              onChange('');
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


// import React from 'react';
// import ReactDatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import CustomInputCalendar from './CustomInputCalendar';
// import { format } from 'date-fns';

// const CusDatePicker = ({ selectedDeadline, setSelectedDeadline, ...props }) => {
//   const [startDate, setStartDate] = React.useState(new Date());

//   return (
//     <ReactDatePicker
//       selected={selectedDeadline ? new Date(selectedDeadline) : startDate}
//       onChange={date => {
//         setStartDate(date);
//         if (date) {
//           // Format date as 'yyyy-MM-dd'
//           const formattedDate = format(date, 'yyyy-MM-dd');
//           setSelectedDeadline(formattedDate);
//         } else {
//           setSelectedDeadline('');
//         }
//       }}
//       dateFormat="eeee, dd MMMM"
//       minDate={new Date()}
//       customInput={<CustomInputCalendar />}
//       {...props}
//     />
//   );
// };

// CusDatePicker.displayName = 'CusDatePicker';

// export default CusDatePicker;

// import React, { forwardRef } from 'react';
// import ReactDatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import CustomInputCalendar from './CustomInputCalendar';
// import { format } from 'date-fns'; 
// const CusDatePicker = forwardRef(({ selectedDeadline, setSelectedDeadline,control, ...props }, ref) => {
//   const [startDate, setStartDate] = React.useState(new Date());

//   return (
//     <ReactDatePicker
//       ref={ref} 
//       selected={selectedDeadline || startDate}
//       onChange={date => {
//         console.log(date);
        
//         setStartDate(date);
//         if (date) {
//           // Форматування дати у потрібний формат
//           const formattedDate = format(date, 'yyyy-MM-dd');
//           setSelectedDeadline(formattedDate);
//           console.log(formattedDate);
          
//         } else {
//           setSelectedDeadline('');
//         }
//       }}
//       dateFormat="eeee, dd MMMM"
//       minDate={new Date()}
//       customInput={<CustomInputCalendar />}
//       control={control}
//       {...props} 
//     />
//   );
// });

// CusDatePicker.displayName = 'CusDatePicker'; 

// export default CusDatePicker;


// import { useForm, Controller } from 'react-hook-form';
// import ReactDatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import CustomInputCalendar from './CustomInputCalendar';

// const CusDatePicker = ({ selectedDeadline, setSelectedDeadline, control }) => {
//   return (
//     <Controller
//       control={control}
//       name="deadline"
//       defaultValue={selectedDeadline || new Date()} // Значення за замовчуванням
//       render={({ field: { onChange, onBlur, value, ref } }) => (
//         <ReactDatePicker
//           selected={value}
//           onChange={(date) => {
//             onChange(date);
//             setSelectedDeadline(date); // Встановити дату в стан компонента
//           }}
//           dateFormat="eeee, dd MMMM"
//           minDate={new Date()}
//           customInput={<CustomInputCalendar />}
//        //   ref={ref} // Передача рефа
//         />
//       )}
//     />
//   );
// };

// export default CusDatePicker;


// import { useState } from 'react';
// import ReactDatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import CustomInputCalendar from './CustomInputCalendar';

// const CusDatePicker = ({ selectedDedline, setSelectedDedline }) => {
//   const [startDate, setStartDate] = useState(new Date());

//   return (
//     <div>
//       <ReactDatePicker
//         selected={selectedDedline ? new Date(selectedDedline) : startDate}
//         onChange={date => {
//           setStartDate(date);
//           setSelectedDedline(date);
//         }}
//         dateFormat="eeee, dd MMMM"
//         minDate={new Date()}
//         customInput={<CustomInputCalendar />}
//       />
//     </div>
//   );
// };

// export default CusDatePicker;
