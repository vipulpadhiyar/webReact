import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import {Keyboard, Modal, StyleSheet, View} from 'react-native';
import DateTimePicker from 'react-native-ui-datepicker';

import {AppColors, AppFonts, AppSpacing} from '~/constants';
import {translate as t} from '~/localization';
import {DateFormat, DateUtils, showError} from '~/utils';

import {AppHOButton} from '../AppHOButton';
import {AppText} from '../AppText';
import {AppTouchable} from '../AppTouchable';

interface IAppCalenderModal {
  onPressDate: (startDate: string, endDate: string, isFixed: boolean) => void;
  maxDate?: string;
  minDate?: string;
  selectedDate?: string;
  startDateFromProps?: string;
  endDateFromProps?: string;
  isFixedFromProps?: boolean;
}

/* The `export interface AppCalenderModalHandles` is defining an interface in TypeScript. This
interface specifies the shape of the object that will be used to interact with the
`AppCalenderModal` component. It declares two methods: `open` and `close`, both of which are
functions that do not take any arguments and return `void`. */
export interface AppCalenderModalHandles {
  open: () => void;
  close: () => void;
}

/* This code snippet is defining a functional component called `AppCalenderModal` using `forwardRef` in
React. The component is a modal that displays a date picker with options for fixed and flexible
dates. Here's a breakdown of what the code is doing: */
export const AppCalenderModal = forwardRef<
  AppCalenderModalHandles,
  IAppCalenderModal
>((props, ref) => {
  const {
    onPressDate,
    maxDate,
    minDate,
    selectedDate,
    startDateFromProps,
    endDateFromProps,
    isFixedFromProps = true,
  } = props;

  /* `visible` is a state variable that determines whether the modal is visible or not. */
  const [visible, setVisible] = useState<boolean>(false);

  /* `isFixedDate` is a state variable that determines if the date selection is fixed or flexible. */
  const [isFixedDate, setFixedDate] = useState<boolean>(isFixedFromProps);
  /* `date` is a state variable that holds the selected date in string format. */
  const [date, setDate] = useState<string>(
    selectedDate && selectedDate !== ''
      ? selectedDate
      : DateUtils.convertDateToDaysJs(
          new Date().toString(),
          DateFormat.YYY_MM_DDTHH,
        ),
  );
  /* `startDate` is a state variable that holds the start date for range selection. */
  const [startDate, setStartDate] = useState<string>(
    startDateFromProps && startDateFromProps !== '' ? startDateFromProps : '',
  );
  /* `endDate` is a state variable that holds the end date for range selection. */
  const [endDate, setEndDate] = useState<string>(
    endDateFromProps && endDateFromProps !== '' ? endDateFromProps : '',
  );

  useEffect(() => {
    if (selectedDate && selectedDate !== '') {
      setDate(selectedDate);
    }
    if (
      startDateFromProps &&
      endDateFromProps &&
      startDateFromProps !== '' &&
      endDateFromProps !== ''
    ) {
      setStartDate(startDateFromProps);
      setEndDate(endDateFromProps);
      setFixedDate(isFixedFromProps);
    }
  }, [selectedDate, endDateFromProps, startDateFromProps, isFixedFromProps]);

  /* This hook allows the parent component to control the modal's visibility. */
  useImperativeHandle(ref, () => ({
    open: () => setVisible(true),
    close: () => setVisible(false),
  }));

  /* This function handles date changes in the date picker. */
  const handleDateChange = (params: any) => {
    if (!isFixedDate) {
      setStartDate(params?.startDate);
      setEndDate(params?.endDate ?? '');
    }
    if (params.date) {
      if (isFixedDate) {
        setDate(params.date);
      }
    }
  };

  /* This function is called when the "Done" button is pressed. */
  const onPressDone = () => {
    Keyboard.dismiss();
    if (isFixedDate) {
      onPressDate(date, '', true);
      setFixedDate(true);
      setVisible(false);
    } else {
      if (startDate === '' || endDate === '' || !startDate || !endDate) {
        showError(t('PleaseEnterStartDateAndEndDate'));
      } else {
        onPressDate(startDate, endDate, false);
        setFixedDate(true);
        setVisible(false);
      }
    }
  };

  /* This function is called when the "Close" button is pressed. */
  const onPressClose = () => {
    setVisible(false);
  };

  /* This function returns the minimum date that can be selected. */
  const returnMinimumDate = () => {
    if (isFixedDate) {
      return minDate;
    } else {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate());
      return tomorrow.toString();
    }
  };

  /* The component renders a modal with a date picker and action buttons. */
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={() => setVisible(false)}>
      <View style={styles.container}>
        <View style={styles.modalContent}>
          <View style={styles.dateContainer}>
            <AppTouchable onPress={() => setFixedDate(true)}>
              <AppText
                text={t('FIX_DATE')}
                fontFamily={
                  isFixedDate
                    ? AppFonts.GentiumBasic_Bold
                    : AppFonts.GentiumBasic_Regular
                }
                fontSize={AppSpacing[16]}
                fontColor={AppColors.peanBlue}
                containerStyle={isFixedDate ? styles.textDecorationStyle : {}}
              />
            </AppTouchable>
            <AppTouchable onPress={() => setFixedDate(false)}>
              <AppText
                text={t('FLEXIBLE_DATE')}
                fontFamily={
                  !isFixedDate
                    ? AppFonts.GentiumBasic_Bold
                    : AppFonts.GentiumBasic_Regular
                }
                fontColor={AppColors.peanBlue}
                fontSize={AppSpacing[16]}
                containerStyle={!isFixedDate ? styles.textDecorationStyle : {}}
              />
            </AppTouchable>
          </View>
          <DateTimePicker
            mode={isFixedDate ? 'single' : 'range'}
            date={date}
            onChange={handleDateChange}
            calendarTextStyle={styles.textStyle}
            selectedItemColor={AppColors.peanBlue}
            headerButtonColor={AppColors.peanBlue}
            headerTextStyle={styles.textStyle}
            minDate={returnMinimumDate()}
            maxDate={maxDate}
            startDate={startDate}
            endDate={endDate}
          />
          <View style={styles.buttonActionContainer}>
            <AppTouchable onPress={onPressClose}>
              <AppText
                text={t('Cancel')}
                fontFamily={AppFonts.GentiumBasic_Bold}
                fontColor={AppColors.peanBlue}
              />
            </AppTouchable>
            <AppHOButton
              text={t('Done')}
              containerStyle={styles.buttonContainer}
              textStyle={styles.doneButton}
              onPress={onPressDone}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: AppColors.modalOverlay,
  },
  modalContent: {
    backgroundColor: AppColors.white,
    borderTopLeftRadius: AppSpacing[20],
    borderTopRightRadius: AppSpacing[20],
    padding: AppSpacing[20],
  },
  buttonActionContainer: {
    marginHorizontal: AppSpacing[40],
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: AppSpacing[10],
  },
  buttonContainer: {
    paddingHorizontal: AppSpacing[30],
    paddingVertical: AppSpacing[10],
    borderRadius: AppSpacing[5],
  },
  dateContainer: {
    flexDirection: 'row',
    columnGap: AppSpacing[24],
    paddingVertical: AppSpacing[10],
  },
  textDecorationStyle: {
    textDecorationLine: 'underline',
  },
  textStyle: {color: AppColors.black},
  doneButton: {paddingVertical: 0},
});
