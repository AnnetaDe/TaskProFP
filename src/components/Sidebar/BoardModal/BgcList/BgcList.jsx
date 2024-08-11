// import clsx from 'clsx';
// import icon from '../../../../images/icons.svg';
// import s from './BgcList.module.css';
// import { previewBgc } from './previewBgc';

// const BgcList = ({ selectedBgc, setSelectedBgc, register, name }) => {
//   console.log(name, 'name');

//   return (
//     <ul className={s.bgc_list}>
//       {previewBgc.map((bgc, idx) => (
//         <li
//           key={idx}
//           className={clsx(s.bgc_item, {
//             [s.selected]: selectedBgc === bgc.previewName,
//           })}
//         >
//           <input
//             type="radio"
//             id={bgc.previewName}
//             name="background"
//             value={bgc.previewName}
//             checked={selectedBgc === bgc.previewName} // Правильне значення
//             onChange={() => {
//               setSelectedBgc(bgc.previewName); // Правильне значення
//               console.log(selectedBgc, 'selectedBgc');
//             }}
//             className={s.bgc_radio}
//             {...register(name)}
//           />
//           <label htmlFor={bgc.previewName}>
//             {bgc.previewName === 'none' ? (
//               <svg width="16" height="16" className={s.svg_icon}>
//                 <use href={bgc.src}></use>
//               </svg>
//             ) : (
//               <img src={bgc.src} alt={`Bgc ${bgc.previewName}`} />
//             )}
//           </label>
//         </li>
//       ))}
//     </ul>
//   );
// };

// export default BgcList;

import clsx from 'clsx';
import s from './BgcList.module.css';
import { previewBgc } from './previewBgc';

const BgcList = ({ selectedBgc, setSelectedBgc, register, name }) => {


  const handleBgcChange = (e, bgcName) => {
    setSelectedBgc(bgcName); // Оновлення selectedBgc
    console.log("Selected Bgc:", bgcName); // Відображення нового значення
  };
  return (
    <ul className={s.bgc_list}>
      {previewBgc.map((bgc, idx) => (
        <li
          key={idx}
          className={clsx(s.bgc_item, {
            [s.selected]: selectedBgc === bgc.previewName,
          })}
        >
          <input
            type="radio"
            id={bgc.previewName}
            name="background"
            value={bgc.previewName}
            checked={selectedBgc === bgc.previewName}
            onClick={(e) => {
              console.log("Radio button clicked");
              handleBgcChange(e, bgc.previewName);
            }}
            className={s.bgc_radio}
            {...register(name)}
          />
          <label htmlFor={bgc.previewName}>
            {bgc.previewName === 'none' ? (
              <svg width="16" height="16"               className={clsx(s.svg_icon, {
                [s.selected]: selectedBgc === bgc.previewName,
              })}>
                <use href={bgc.src}></use>
              </svg>
            ) : (
              <img src={bgc.src} alt={`Bgc ${bgc.previewName}`} />
            )}
          </label>
        </li>
      ))}
    </ul>
  );
};
export default BgcList;
