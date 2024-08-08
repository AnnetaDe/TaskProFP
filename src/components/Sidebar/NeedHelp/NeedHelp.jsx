import React, { useState } from 'react';
import s from './NeedHelp.module.css';
import {
  helpMob1x,
  helpMob2x,
  helpTab1x,
  helpTab2x,
  helpDesk1x,
  helpDesk2x,
} from '../../../assets/images/needHelp/index';
import Modal from '../../Modal/Modal';
import NeedHelpForm from './NeedHelpForm';
import icon from '../../../images/icons.svg';

const NeedHelp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => {
    setIsOpen(isOpen => !isOpen);
  };
  return (
    <div className={s.container}>
      <picture className={s.image}>
        <source
          media="(max-width: 375px)"
          srcSet={`${helpMob1x} 1x, ${helpMob2x} 2x`}
        />

        <source
          media="(min-width: 768px)"
          srcSet={`${helpTab1x} 1x, ${helpTab2x} 2x`}
        />

        <source
          media="(min-width: 1440px)"
          srcSet={`${helpDesk1x} 1x, ${helpDesk2x} 2x`}
        />

        <img
          src={helpMob1x}
          srcSet={`${helpMob1x} 1x, ${helpMob2x} 2x`}
          alt="Smiling plant"
        />
      </picture>
      <div className={s.wrapper}>
        <p className={s.text}>
          If you need help with <br />
          <span className={s.span}>TaskPro</span>, check out our support
          resources or reach out to our customer support team.
        </p>

        <button type="button" className={s.btn} onClick={toggleModal}>
          <svg width="20px" height="20px" className={s.icon}>
            <use href={icon + '#icon-help'}></use>
          </svg>
          Need help?
        </button>
      </div>

      {isOpen && (
        <Modal
          onClose={toggleModal}
          children={<NeedHelpForm onClose={toggleModal} />}
        />
      )}
    </div>
  );
};
export default NeedHelp;
