import React from 'react';

import {translate} from '~/localization';

import {FaqButton} from '../FaqButton';

type FaqItemProps = {
  item: FaqItemType;
  index: number;
  openIndex: number | null;
  setOpenIndex: (index: number | null) => void;
};

export const FaqItem = (props: FaqItemProps) => {
  const {item, index, openIndex, setOpenIndex} = props;
  const isOpen = openIndex === index;

  const handleClick = () => {
    setOpenIndex(isOpen ? null : index);
  };

  return (
    <FaqButton
      title={translate(item.question)}
      description={isOpen ? translate(item.answer) : undefined}
      onClick={handleClick}
      index={index}
      openIndex={openIndex}
    />
  );
};
