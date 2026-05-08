import React from 'react';
import {View} from 'react-native';

import {
  AppButton,
  AppContainer,
  AppFlatList,
  AppListFooter,
  AppText,
} from '~/components';
import {
  AppColors,
  AppConstants,
  AppFontSizes,
  AppScreens,
  ColorTheme,
} from '~/constants';
import {useMainController} from '~/controllers';
import {logoutNavigation} from '~/helpers';
import {useColorTheme} from '~/hooks';
import {translate} from '~/localization';
import {keyExtractorHandler} from '~/utils';

import styles from './styles';

/**
 * Represents the main screen of the application.
 * @returns {JSX.Element} - React element.
 */
export const MainScreen = (): React.JSX.Element => {
  const {
    listData,
    isRefetching,
    isFetching,
    isFetchingNextPage,
    refetch,
    onEndReachedHandler,
  } = useMainController();
  const {colorScheme, style} = useColorTheme(styles);

  const renderItem = (item: ListItemType) => {
    return <AppText text={item.batch_name} />;
  };

  const renderListFooter = () => {
    return <AppListFooter isVisible={isFetchingNextPage} />;
  };

  return (
    <AppContainer testID={AppScreens.MainScreen}>
      <View style={style.container}>
        <AppText
          text={translate('main_screen')}
          fontSize={AppFontSizes[14]}
          fontColor={AppColors.black}
        />
        <AppButton
          textColor={ColorTheme[colorScheme].colors.text}
          text={translate('logout')}
          onPress={logoutNavigation}
          containerStyle={{borderColor: ColorTheme[colorScheme].colors.text}}
        />
        <AppFlatList
          data={listData}
          refreshing={isRefetching || isFetching}
          renderItem={({item}) => renderItem(item as ListItemType)}
          onRefresh={refetch}
          onEndReachedThreshold={AppConstants.ON_END_REACHED_THRESHOLD}
          keyExtractor={keyExtractorHandler}
          onEndReached={onEndReachedHandler}
          ListFooterComponent={renderListFooter}
        />
      </View>
    </AppContainer>
  );
};
