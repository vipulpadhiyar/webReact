import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';

import {AppHOButton, AppText} from '~/components';
import {AppColors, AppFonts, AppFontSizes, AppSpacing} from '~/constants';
import {QuetosENUM} from '~/enums/quetos';
import {translate} from '~/localization';
import {capitalizeFirstLetter, DateFormat, formateLocalDate} from '~/utils';
import {returnStatus, setFlexibleDatesForQuetos} from '~/utils/quetos';

/* *
 * Interface defining the props for the QuetosListItem component
 * */
interface QuetosListItemProps {
  data: IQuetosDetails;
  onPress: (item: IQuetosDetails) => void;
  onPressModifyDetails?: (item: IQuetosDetails) => void;
  quetosStatus: string;
}

/* *
 * QuetosListItem component: Renders a list item with quote details and a button
 * */
export const QuetosListItem = memo(
  (props: QuetosListItemProps): React.JSX.Element => {
    const {data, quetosStatus, onPress, onPressModifyDetails} = props;
    const date = data?.isFlexiblePickUpDate
      ? setFlexibleDatesForQuetos(data?.pickUpDate, data?.lastPickUpDate)
      : formateLocalDate(data?.pickUpDate, DateFormat.MM_DD_YYYY) ?? '';

    /**
     * The function `getButtonText` returns a specific text based on the input `quetosStatus` using a
     * switch statement.
     */
    const getButtonText = (currentQuetosStatus: string) => {
      switch (currentQuetosStatus) {
        case QuetosENUM.PENDING_QUETOS:
          return translate('modify_details');
        case QuetosENUM.QUETOS_RECEIVED:
          return translate('view_quotes');
        default:
          return translate('re_submit');
      }
    };

    /**
     * The function `onPressViewQuetos` calls the `onPress` function with the `data` parameter.
     */
    const onPressViewQuetos = () => {
      onPress(data);
    };
    /**
     * The function `onPressModifyDetails` calls the `onPress` function with the `data` parameter.
     */
    const onPressModify = () => {
      if (onPressModifyDetails) {
        onPressModifyDetails(data);
      }
    };
    return (
      <View style={styles.listViewContainer}>
        <View style={styles.quetosListContainer}>
          <View style={styles.quetosDetailsContainer}>
            <AppText
              text={translate('TripName')}
              fontSize={AppFontSizes[16]}
              fontFamily={AppFonts.GentiumBasic_Regular}
              fontColor={AppColors.greyLight1}
            />
            <AppText
              text={capitalizeFirstLetter(data?.name)}
              fontSize={AppFontSizes[14]}
              fontFamily={AppFonts.GentiumBasic_Regular}
              fontColor={AppColors.greyLight8}
            />
          </View>
          <View style={styles.quetosDetailsContainer}>
            <AppText
              text={translate('TripType')}
              fontSize={AppFontSizes[16]}
              fontFamily={AppFonts.GentiumBasic_Regular}
              fontColor={AppColors.greyLight1}
            />
            <AppText
              text={returnStatus(data?.tripType)}
              fontSize={AppFontSizes[14]}
              fontFamily={AppFonts.GentiumBasic_Regular}
              fontColor={AppColors.greyLight8}
            />
          </View>
          <View style={styles.quetosDetailsContainer}>
            <AppText
              text={
                !data?.isFlexiblePickUpDate
                  ? translate('PickupDate')
                  : translate('flexible_pick_up_date')
              }
              fontSize={AppFontSizes[16]}
              fontFamily={AppFonts.GentiumBasic_Regular}
              fontColor={AppColors.greyLight1}
            />
            <AppText
              text={date}
              fontSize={AppFontSizes[14]}
              fontFamily={AppFonts.GentiumBasic_Regular}
              fontColor={AppColors.greyLight8}
            />
          </View>
          <View style={styles.quetosDetailsContainer}>
            <AppText
              text={translate('no_of_horses')}
              fontSize={AppFontSizes[16]}
              fontFamily={AppFonts.GentiumBasic_Regular}
              fontColor={AppColors.greyLight1}
            />
            <AppText
              text={data?.totalHorses.toString()}
              fontSize={AppFontSizes[14]}
              fontFamily={AppFonts.GentiumBasic_Regular}
              fontColor={AppColors.greyLight8}
            />
          </View>
        </View>
        <View style={styles.separatorView} />
        <View
          style={
            quetosStatus === QuetosENUM.DECLINE_QUETOS
              ? styles.viewButtonContainerStartFlex
              : styles.viewButtonContainer
          }>
          <AppHOButton
            onPress={onPressViewQuetos}
            text={getButtonText(quetosStatus)}
            containerStyle={styles.viewButton}
            textFontFamily={AppFonts.GentiumBasic_Bold}
            textSize={AppFontSizes[14]}
          />
          {quetosStatus === QuetosENUM.DECLINE_QUETOS ? (
            <AppHOButton
              text={translate('modify_details')}
              containerStyle={styles.modifyDetailsContainer}
              textFontFamily={AppFonts.GentiumBasic_Bold}
              textSize={AppFontSizes[14]}
              textStyle={styles.modifyDetailsText}
              onPress={onPressModify}
            />
          ) : null}
        </View>
      </View>
    );
  },
);

/* *
 * Styles for the QuetosListItem component
 * */
const styles = StyleSheet.create({
  quetosListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: AppSpacing[16],
  },
  quetosDetailsContainer: {
    width: '50%',
    padding: AppSpacing[8],
  },
  separatorView: {
    height: 1,
    backgroundColor: AppColors.greyE8,
    marginVertical: AppSpacing[10],
  },
  viewBtn: {
    height: AppSpacing[35],
    paddingVertical: 0,
  },
  buttonContainer: {
    paddingHorizontal: 0,
  },
  viewButtonContainer: {
    justifyContent: 'flex-end',
    paddingRight: AppSpacing[20],
    marginTop: AppSpacing[6],
    flexDirection: 'row',
    columnGap: AppSpacing[10],
  },
  viewButtonContainerStartFlex: {
    justifyContent: 'flex-start',
    paddingLeft: AppSpacing[20],
    marginTop: AppSpacing[6],
    flexDirection: 'row',
    columnGap: AppSpacing[10],
  },
  viewButton: {
    paddingVertical: AppSpacing[10],
    paddingHorizontal: AppSpacing[16],
  },
  listViewContainer: {
    shadowColor: AppColors.modalOverlay000,
    shadowRadius: AppSpacing[3],
    backgroundColor: AppColors.white,
    borderRadius: AppSpacing[24],
    paddingVertical: AppSpacing[16],
  },
  modifyDetailsContainer: {
    paddingVertical: AppSpacing[10],
    paddingHorizontal: AppSpacing[16],
    backgroundColor: AppColors.white,
  },
  modifyDetailsText: {
    color: AppColors.peanBlue,
  },
});
