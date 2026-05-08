import React from 'react';
import {FlatList, View} from 'react-native';

import {
  AppContainer,
  AppFlatList,
  AppModal,
  AppNoData,
  AppSearchBar,
  AppText,
  AppTouchable,
} from '~/components';
import {AppHeader} from '~/components/AppHeader';
import {
  AppColors,
  AppConstants,
  AppFonts,
  AppFontSizes,
  QuetosScreenTestKeys,
} from '~/constants';
import {QuetosENUM} from '~/enums/quetos';
import {translate} from '~/localization';

import {LogOutModal} from '../Profile/components/LogOutModal';

import {QuetosListItem} from './components/QuetosListItem';
import {useQuetosController} from './controller';
import styles from './styles';

/* *
 * QuotesScreen component: Renders the main screen for displaying and searching quotes
 * */
export const QuotesScreen = () => {
  const {
    quetosStatusData,
    searchDebounceFunction,
    quetosPendingList,
    isFetching,
    isRefetching,
    searchDebounceFunctionReceived,
    searchDebounceFunctionDecline,
    currentStatus,
    isFetchingReceived,
    isRefetchingReceived,
    quetosReceivedList,
    isFetchingDecline,
    isRefetchingDecline,
    quetosDeclineList,
    flatListRef,
    resubmitModalRef,
    onResubmit,
    closeModalResubmit,
    onEndReachedHandlerReceivedQuetos,
    refetchDeclineQuetos,
    refetchReceivedQuetos,
    refetch,
    onPressStatus,
    onEndReachedHandler,
    onPressQuetosDetails,
    onPressModifyDetails,
  } = useQuetosController();

  /* *
   * Returns the UI for quetos status item
   * */
  const returnQuetosStatus = (item: DropdownPickerType, index: number) => {
    /* *
     * change the status for quetos
     * */
    const onPressStatusItem = () => {
      onPressStatus(item, index);
    };

    return (
      <AppTouchable
        testID={item?.label}
        style={styles.statusStyle}
        key={item?.label}
        onPress={onPressStatusItem}>
        <AppText
          text={item.value}
          fontFamily={
            item?.isSelected
              ? AppFonts.GentiumBasic_Bold
              : AppFonts.GentiumBasic_Regular
          }
          fontSize={AppFontSizes[20]}
          fontColor={item ? AppColors.greyLight1 : AppColors.greyLight1}
        />
      </AppTouchable>
    );
  };

  /* *
   * Returns the UI for quetos details item
   * */
  const returnQuetosDetails = (item: IQuetosDetails) => {
    const onPressQuetos = () => {
      onPressQuetosDetails(item);
    };
    return (
      <QuetosListItem
        key={item?._id}
        data={item}
        onPress={onPressQuetos}
        quetosStatus={currentStatus}
        onPressModifyDetails={onPressModifyDetails}
      />
    );
  };
  /* *
   * Returns the UI for empty details item
   * */
  const returnEmptyContainer = () => {
    return (
      <View style={styles.emptyContainer}>
        <AppNoData
          fontSize={AppFontSizes[24]}
          text={translate('no_quetos_available')}
        />
      </View>
    );
  };

  /**
   * The function `getSearchDebounceFunction` returns different debounce functions based on the current
   * status.
   * @returns The function `getSearchDebounceFunction` returns either `searchDebounceFunction` if the
   * `currentStatus` is `QuetosENUM.PENDING_QUETOS`, `searchDebounceFunctionReceived` if the
   * `currentStatus` is `QuetosENUM.QUETOS_RECEIVED`, or `searchDebounceFunction` for any other value of
   * `currentStatus`.
   */
  const getSearchDebounceFunction = () => {
    if (currentStatus === QuetosENUM.PENDING_QUETOS) {
      return searchDebounceFunction;
    } else if (currentStatus === QuetosENUM.QUETOS_RECEIVED) {
      return searchDebounceFunctionReceived;
    } else {
      return searchDebounceFunctionDecline;
    }
  };

  return (
    <AppContainer
      testID={QuetosScreenTestKeys.QUETOS_SCREEN}
      containerStyle={styles.container}>
      <AppHeader
        titleTestId={QuetosScreenTestKeys.TITLE}
        text={translate('quotes')}
        containerStyle={styles.containerStyle}
      />
      <AppSearchBar
        testId={QuetosScreenTestKeys.SEARCH}
        inputProps={{
          style: styles.searchAddressStyle,
        }}
        onChangeText={getSearchDebounceFunction()}
        placeholderText={translate('SearchHere')}
        containerStyle={styles.searchContainerStyle}
      />
      <View style={styles.scrollContainer}>
        <View style={styles.listStatusContainer}>
          <FlatList
            testID={QuetosScreenTestKeys.STATUS_LIST}
            horizontal
            ref={flatListRef}
            data={quetosStatusData}
            renderItem={({item, index}) =>
              returnQuetosStatus(item as DropdownPickerType, index)
            }
            showsHorizontalScrollIndicator={false}
          />
        </View>
        {currentStatus === QuetosENUM.PENDING_QUETOS ? (
          quetosPendingList && quetosPendingList?.length > 0 ? (
            <AppFlatList
              testID={QuetosScreenTestKeys.QUETOS_PENDING_LIST}
              data={quetosPendingList}
              renderItem={({item}) =>
                returnQuetosDetails(item as IQuetosDetails)
              }
              onEndReachedThreshold={AppConstants.ON_END_REACHED_THRESHOLD}
              onEndReached={onEndReachedHandler}
              refreshing={isFetching || isRefetching}
              onRefresh={refetch}
              contentContainerStyle={styles.contentContainerStyle}
            />
          ) : (
            returnEmptyContainer()
          )
        ) : null}
        {currentStatus === QuetosENUM.DECLINE_QUETOS ? (
          quetosDeclineList && quetosDeclineList?.length > 0 ? (
            <AppFlatList
              testID={QuetosScreenTestKeys.QUETOS_DECLINE_LIST}
              data={quetosDeclineList}
              renderItem={({item}) =>
                returnQuetosDetails(item as IQuetosDetails)
              }
              onEndReachedThreshold={AppConstants.ON_END_REACHED_THRESHOLD}
              onEndReached={onEndReachedHandler}
              refreshing={isFetchingDecline || isRefetchingDecline}
              onRefresh={refetchDeclineQuetos}
              contentContainerStyle={styles.contentContainerStyle}
            />
          ) : (
            returnEmptyContainer()
          )
        ) : null}
        {currentStatus === QuetosENUM.QUETOS_RECEIVED ? (
          quetosReceivedList && quetosReceivedList?.length > 0 ? (
            <AppFlatList
              testID={QuetosScreenTestKeys.QUETOS_RECEIVED_LIST}
              data={quetosReceivedList}
              renderItem={({item}) =>
                returnQuetosDetails(item as IQuetosDetails)
              }
              onEndReachedThreshold={AppConstants.ON_END_REACHED_THRESHOLD}
              onEndReached={onEndReachedHandlerReceivedQuetos}
              refreshing={isFetchingReceived || isRefetchingReceived}
              onRefresh={refetchReceivedQuetos}
              contentContainerStyle={styles.contentContainerStyle}
            />
          ) : (
            returnEmptyContainer()
          )
        ) : null}
      </View>
      <AppModal ref={resubmitModalRef}>
        <LogOutModal
          header={translate('re_submit_quote')}
          message={translate('are_you_sure_you_want_to_re_submit_quotes')}
          onCancel={closeModalResubmit}
          onConfirm={onResubmit}
        />
      </AppModal>
    </AppContainer>
  );
};
