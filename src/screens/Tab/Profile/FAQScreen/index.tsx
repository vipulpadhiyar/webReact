import React, {useState} from 'react';
import {View} from 'react-native';

import {AppFlatList, AppScreen} from '~/components';
import {translate} from '~/localization';

import {FaqItem} from './Components/FaqItem';
import {styles} from './styles';
import {useFaqController} from './useFaqController';

export const FAQScreen = () => {
  // useFaqController to handle the faq list data
  const {onBack, listData} = useFaqController();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  // Used to renderFaq Item
  const renderFaq = (item: FaqItemType, index: number) => {
    return (
      <FaqItem
        key={index}
        item={item}
        index={index}
        openIndex={openIndex}
        setOpenIndex={setOpenIndex}
      />
    );
  };
  return (
    <AppScreen header={translate('FAQ')} onBack={onBack}>
      <View style={styles.subContainer}>
        <AppFlatList
          renderItem={({item, index}) => renderFaq(item as FaqItemType, index)}
          data={listData}
        />
      </View>
    </AppScreen>
  );
};
