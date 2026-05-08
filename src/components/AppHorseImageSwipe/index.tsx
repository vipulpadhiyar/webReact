/**
 * The `AppHorseImageSwipe` component displays an image of a horse with a close button and header text.
 * @param {IAppHorseImageProps} props - The `props` object in the `AppHorseImage` component consists of
 * two properties:
 * @returns The `AppHorseImage` component is being returned. It consists of a View containing a
 * headerView with an `AppText` component and an `AppSvgButton` component, and an Image component
 * displaying the image passed as a prop.
 */
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {ActivityIndicator, FlatList, Image, View} from 'react-native';

import {
  AppColors,
  AppFonts,
  AppFontSizes,
  AppSpacing,
  IcClose,
  IcLeftSwipe,
  IcRightSwipe,
} from '~/constants';
import {Bucket} from '~/enums/fileUpload';
import {translate} from '~/localization';
import {completeUrl, log} from '~/utils';

import {AppSvgButton} from '../AppSvgButton';
import {AppText} from '../AppText';

import {styles} from './styles';

interface IAppHorseImageSwipeProps {
  imageList: string[];
  selectedIndex: number;
  onPressClose: () => void;
}

export const AppHorseImageSwipe = (props: IAppHorseImageSwipeProps) => {
  const {imageList, onPressClose, selectedIndex} = props;
  const [currentIndex, setCurrentIndex] = useState(selectedIndex);
  const [showImage, setShowImage] = useState(false);

  const ref = useRef<FlatList>();

  const _onViewableItemsChanged = useCallback(({viewableItems}) => {
    let index = viewableItems[0]?.index;
    if (index !== undefined) {
      setCurrentIndex(index);
    }
  }, []);

  const _viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const onLeftSwipe = () => {
    ref.current?.scrollToIndex({
      index: currentIndex - 1,
      animated: true,
    });
  };

  const onRightSwipe = () => {
    ref.current?.scrollToIndex({
      index: currentIndex + 1,
      animated: true,
    });
  };

  useEffect(() => {
    setTimeout(() => {
      ref.current?.scrollToIndex({
        index: selectedIndex,
        animated: true,
      });
      setTimeout(() => {
        setShowImage(true);
      }, 300);
    }, 300);

    return () => {};
  }, []);

  return (
    <View style={styles.modal}>
      <View style={styles.container}>
        <View style={styles.headerView}>
          <AppText
            text={translate('HorseImage')}
            fontFamily={AppFonts.GentiumBasic_Bold}
            fontSize={AppFontSizes[20]}
            fontColor={AppColors.peanBlue}
          />
          <AppSvgButton icon={IcClose} onPress={onPressClose} />
        </View>
        <View>
          <FlatList
            ref={ref}
            horizontal
            pagingEnabled
            data={imageList}
            onViewableItemsChanged={_onViewableItemsChanged}
            viewabilityConfig={_viewabilityConfig}
            renderItem={({item, index}) => {
              log('item', item);
              return (
                <View key={index}>
                  <Image
                    source={{uri: completeUrl(item, Bucket.HORSE)}}
                    style={styles.img}
                    resizeMode={'contain'}
                    borderRadius={AppSpacing[13]}
                  />
                </View>
              );
            }}
          />
          {showImage ? null : (
            <ActivityIndicator
              style={styles.activity}
              color={AppColors.peanBlue}
            />
          )}
        </View>
      </View>
      {currentIndex === 0 ? null : (
        <AppSvgButton
          icon={IcLeftSwipe}
          onPress={onLeftSwipe}
          style={styles.leftSwipe}
        />
      )}
      {currentIndex === imageList.length - 1 ? null : (
        <AppSvgButton
          icon={IcRightSwipe}
          onPress={onRightSwipe}
          style={styles.rightSwipe}
        />
      )}
    </View>
  );
};
