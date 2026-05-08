import React from 'react';
import {View} from 'react-native';

import {AppImageLoader, AppTouchable} from '~/components';
import {AppSpacing} from '~/constants';
import {Bucket} from '~/enums/fileUpload';
import {completeUrl} from '~/utils';

import styles from './styles';
/**
 *  Horse Image will be used to show grid image of horse
 */
interface IHorseImage {
  image: string | FileType;
  index: number;
  onView: (index: number) => void;
}

export const HorseImage = (props: IHorseImage) => {
  const {image, index, onView} = props;

  let newIndex = index + 1;
  let marginRight = AppSpacing[20];
  if (newIndex % 3 === 0) {
    marginRight = 0;
  }
  /**
   * onViewPress function to call with current index
   */
  const onViewPress = () => {
    onView(index);
  };
  return (
    <View key={String(image)}>
      <AppTouchable
        style={[
          styles.imageStyle,
          {
            marginBottom: AppSpacing[20],
            marginRight,
          },
        ]}
        onPress={onViewPress}>
        <AppImageLoader
          source={completeUrl(String(image), Bucket.HORSE)}
          imageStyle={styles.img}
          resizeMode={'cover'}
        />
      </AppTouchable>
    </View>
  );
};
