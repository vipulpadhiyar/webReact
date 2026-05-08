import React from 'react';
import {View} from 'react-native';

import {AppButton, AppFlatList, AppNoData, AppScreen} from '~/components';
import {AppConstants, AppFonts, AppSpacing} from '~/constants';
import {translate} from '~/localization';

import {HorseListItem} from './Components/HorseListItem';
import {useHorseProfileController} from './horseProfileConroller';
import styles from './styles';

export const HorseProfileScreen = () => {
  const {
    onAdd,
    isFetching,
    isRefetching,
    horseList,
    refetch,
    onEndReachedHandler,
    onDetails,
  } = useHorseProfileController();

  const renderHorseProfile = (item: HorseProfile) => {
    return <HorseListItem horse={item} onDetails={onDetails} />;
  };

  return (
    <AppScreen header={translate('HorseProfile')} headerStyle={styles.header}>
      <View style={styles.container}>
        <AppFlatList
          style={styles.listStyle}
          data={horseList}
          refreshing={isFetching || isRefetching}
          onRefresh={refetch}
          ListHeaderComponent={
            <View style={styles.addBtnContainer}>
              <AppButton
                text={translate('add_new_horse')}
                containerStyle={styles.addBtn}
                textFontFamily={AppFonts.GentiumBasic_Bold}
                textSize={AppSpacing[14]}
                onPress={onAdd}
              />
            </View>
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <AppNoData text={translate('NoHorseProfiles')} />
            </View>
          }
          renderItem={({item}) => renderHorseProfile(item as HorseProfile)}
          onEndReachedThreshold={AppConstants.ON_END_REACHED_THRESHOLD}
          onEndReached={onEndReachedHandler}
        />
      </View>
    </AppScreen>
  );
};
