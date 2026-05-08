import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';

import {AppHOButton, AppText} from '~/components';
import {
  AppColors,
  AppFonts,
  AppFontSizes,
  AppSpacing,
  IcStar,
  IcSuccess,
} from '~/constants';
import {QuotationStatus} from '~/enums/quetos';
import {translate} from '~/localization';

/* The `interface ReceivedQuetosListItemProps` is defining the props that can be passed to the
`ReceivedQuetosListItem` component. Here's a breakdown of each property: */
interface ReceivedQuetosListItemProps {
  data: Quotation;
  testID?: string;
  onPress: (data: Quotation) => void;
  onPressDecline: (data: Quotation) => void;
  horseLength: number;
  acceptedQuotation?: string;
  trailerType: string;
}

/*
 * ReceivedQuetosListItem component for displaying an ReceivedQuetosListItem prediction.
 * @param {AddressProps} props - Properties for the ReceivedQuetosListItem component.
 * @returns {React.JSX.Element} - ReceivedQuetosListItem component.
 */
export const ReceivedQuetosListItem = memo(
  (props: ReceivedQuetosListItemProps): React.JSX.Element => {
    const {
      data,
      trailerType,
      onPress,
      horseLength,
      acceptedQuotation,
      onPressDecline,
    } = props;

    const cost = data?.cost?.toFixed(2) ?? '';

    /*
     * Handles the press event on the ReceivedQuetosListItem item.
     * Calls the onPress function passed as a prop with the ReceivedQuetosListItem data.
     */
    const onPressAccept = () => {
      onPress(data);
    };
    /*
     * Handles the press event on the ReceivedQuetosListItem item.
     * Calls the onPress function passed as a prop with the ReceivedQuetosListItem data.
     */
    const onPressReject = () => {
      onPressDecline(data);
    };

    /* The `return` statement in the code snippet is rendering a JSX structure that represents the UI of
  the `ReceivedQuetosListItem` component. Here's a breakdown of what it's doing: */
    return (
      <View style={styles.quetosListContainer}>
        <View style={styles.priceContainer}>
          <AppText
            text={`${horseLength} ${translate(
              'horse_head_to_head',
            )} ${trailerType}`}
            fontFamily={AppFonts.GentiumBasic_Bold}
            fontSize={AppFontSizes[16]}
            fontColor={AppColors.greyLight1}
            containerStyle={styles.horseHeadController}
          />
          <AppText
            text={`$ ${cost}`}
            fontFamily={AppFonts.GentiumBasic_Bold}
            fontSize={AppFontSizes[16]}
            fontColor={AppColors.greyLight1}
          />
        </View>
        <View style={styles.priceContainer}>
          <AppText
            text={`${data?.yearsInBusiness} ${translate('years_in_business')}`}
            fontFamily={AppFonts.GentiumBasic_Regular}
            fontSize={AppFontSizes[14]}
            fontColor={AppColors.greyLight8}
          />
          <View style={styles.starContainer}>
            <IcStar />
            <AppText
              text={data?.ratings.toString()}
              fontFamily={AppFonts.GentiumBasic_Regular}
              fontSize={AppFontSizes[12]}
              fontColor={AppColors.yellow}
            />
          </View>
        </View>
        <View style={styles.separatorView} />
        {acceptedQuotation === data?._id ? (
          <View style={styles.viewButtonContainer}>
            <AppHOButton
              text={translate('successfully_accepted')}
              containerStyle={styles.acceptSuccessButton}
              textFontFamily={AppFonts.GentiumBasic_Bold}
              textColor={AppColors.peanBlue}
              textSize={AppFontSizes[16]}
              leftIcon={IcSuccess}
            />
          </View>
        ) : (
          <View style={styles.viewButtonContainer}>
            <AppHOButton
              text={translate('accept')}
              containerStyle={styles.viewButton}
              textFontFamily={AppFonts.GentiumBasic_Bold}
              textSize={AppFontSizes[14]}
              onPress={onPressAccept}
              disabled={
                acceptedQuotation || data?.status === QuotationStatus.REJECTED
                  ? true
                  : false
              }
            />
            <AppHOButton
              text={translate('decline')}
              containerStyle={styles.modifyDetailsContainer}
              textFontFamily={AppFonts.GentiumBasic_Bold}
              textSize={AppFontSizes[14]}
              textStyle={styles.modifyDetailsText}
              disabled={
                acceptedQuotation || data?.status === QuotationStatus.REJECTED
                  ? true
                  : false
              }
              onPress={onPressReject}
            />
          </View>
        )}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  quetosListContainer: {
    shadowColor: AppColors.modalOverlay000,
    shadowRadius: AppSpacing[3],
    backgroundColor: AppColors.white,
    borderRadius: AppSpacing[24],
    paddingVertical: AppSpacing[18],
    rowGap: AppSpacing[8],
    marginBottom: AppSpacing[20],
  },
  receivedQuetosText: {
    paddingVertical: AppSpacing[16],
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: AppSpacing[18],
  },
  starContainer: {
    marginStart: AppSpacing[10],
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: AppSpacing[4],
    backgroundColor: AppColors.yellow2,
    paddingHorizontal: AppSpacing[8],
    paddingVertical: AppSpacing[4],
    borderRadius: AppSpacing[10],
  },
  separatorView: {
    height: 1,
    backgroundColor: AppColors.greyE8,
    marginVertical: AppSpacing[10],
  },
  viewButtonContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    columnGap: AppSpacing[12],
  },
  viewButton: {
    paddingVertical: AppSpacing[10],
    paddingHorizontal: AppSpacing[40],
  },
  modifyDetailsContainer: {
    paddingVertical: AppSpacing[10],
    paddingHorizontal: AppSpacing[40],
    backgroundColor: AppColors.white,
  },
  modifyDetailsText: {
    color: AppColors.peanBlue,
  },
  acceptSuccessButton: {
    paddingVertical: AppSpacing[14],
    paddingHorizontal: AppSpacing[40],
    backgroundColor: AppColors.inputBackground,
    borderWidth: 0,
  },
  horseHeadController: {
    paddingRight: AppSpacing[30],
    flex: 1,
  },
});
