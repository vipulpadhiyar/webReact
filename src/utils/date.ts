import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import moment from 'moment';

dayjs.extend(utc);

import {translate} from '~/localization';

/**
 * Define date formate that using with below functions
 */
export enum DateFormat {
  DD_MM_YYYY = 'DD-MM-YYYY',
  YYYY_MM_DD = 'YYYY-MM-DD',
  MM_DD_YYYY = 'MM-DD-YYYY',
  DD_MMM_YYYY = 'DD MMM YYYY',
  HH_MM_A = 'hh:mm A',
  MMM = 'MMM',
  DD = 'DD',
  DDD_MMMM_DD_YYYY_H_MM_A = 'ddd, MMMM DD, YYYY [at] h:mm A',
  MMMM_DD_YYYY_H_MM_A = 'MMMM DD, YYYY [at] h:mm A',
  HH_MM_SS = 'HH:mm:ss',
  DO_MMM_YYYY = 'Do MMM YYYY',
  YYY_MM_DDTHH = 'YYYY-MM-DDTHH:mm:ss.SSS[Z]',
  MM_DD_YYYY_HH_MM_A = 'MM-DD-YYYY, hh:mm a',
}

/**
 * The function `formateLocalDate` takes a Date or string input and formats it according to the
 * specified DateFormat using the moment library.
 * @param {Date | string} date - The `date` parameter in the `formateLocalDate` function can accept a
 * value of type `Date` or `string`, representing the date that you want to format.
 * @param {DateFormat} to - The `to` parameter in the `formateLocalDate` function represents the
 * format in which you want to display the date. It specifies the desired format for the output string
 * representation of the date. For example, it could be "YYYY-MM-DD" for a date format like "2022-
 * @returns The function `formateLocalDate` is returning a formatted date string based on the input
 * date and the specified format. It uses the Moment.js library to format the date according to the
 * provided `to` format.
 */
export const formateLocalDate = (
  date: Date | string,
  to: DateFormat,
): string => {
  return moment(date).format(to);
};

/**
 * The function `formateUtcDate` takes a Date or string input, converts it to the specified format, and
 * returns the formatted date as a string.
 * @param {Date | string} date - The `date` parameter in the `formateUtcDate` function can accept a
 * `Date` object or a string representing a date.
 * @param {DateFormat} to - The `to` parameter in the `formateUtcDate` function represents the format
 * in which you want to convert the UTC date. It specifies the desired output format for the date, such
 * as "YYYY-MM-DD" or "MMM DD, YYYY HH:mm:ss". This parameter determines how the date
 * @returns A string representing the date formatted according to the specified `DateFormat`.
 */
const formateUtcDate = (date: Date | string, to: DateFormat): string => {
  return moment.utc(date).local().format(to);
};

const localToUtc = (localDate: Date | string) => {
  return moment.utc(localDate).toISOString();
};

const utcToLocal = (utcDate: Date | string) => {
  return moment.utc(utcDate).local().toISOString();
};

const isTodayDateForLocal = (utcDate: Date | string): boolean => {
  return moment.utc(utcDate).local().isSame(moment().startOf('day'), 'day');
};

const formatDateAgo = (utcDate: Date | string) => {
  const now = moment();
  const date = moment(utcToLocal(utcDate));
  const diff = now.diff(utcToLocal(utcDate), 'minutes');

  if (diff <= 0) {
    return translate('JUST_NOW');
  } else if (diff < 60) {
    return diff + ` ${translate('MINUTES_AGO')}`;
  } else if (diff < 24 * 60) {
    const hours = Math.floor(diff / 60);
    return hours + ` ${translate('HOURS_AGO')}`;
  } else {
    return date.format(DateFormat.DD_MMM_YYYY);
  }
};

const convertDateToDaysJs = (date: Date | string, to: DateFormat): string => {
  return dayjs(date).format(to);
};

/**
 * Converts a date string in ISO format to a more readable format.
 * @param {string} isoDate - The ISO date string (e.g., "2024-07-25T00:00:00.000Z").
 * @returns {string} - The formatted date string (e.g., "25th July, 2024").
 */
const formatDateToStandardFormate = (selectedDate: string): string => {
  const date = new Date(selectedDate);
  const day = date.getDate();
  const month = date.toLocaleString('default', {month: 'long'});
  const year = date.getFullYear();

  // Add suffix for day
  const daySuffix = (SelectedDay: number) => {
    if (SelectedDay > 3 && SelectedDay < 21) {
      return 'th';
    } // 4-20 are 'th'
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  };

  return `${day}${daySuffix(day)} ${month}, ${year}`;
};

export const DateUtils = {
  DateFormat,
  formateUtcDate,
  formateLocalDate,
  localToUtc,
  utcToLocal,
  formatDateAgo,
  isTodayDateForLocal,
  convertDateToDaysJs,
  formatDateToStandardFormate,
};
