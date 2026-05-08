import {QuetosTypeEnum} from '~/enums/quetos';
import {translate} from '~/localization';

import {DateFormat, DateUtils} from './date';

/* The `export const quetosStaticLabel` is an array of objects representing static labels related to
quotes. Each object in the array has three properties:
- `label`: Represents the display label for a specific quote status.
- `isSelected`: Indicates whether the quote status is currently selected or not.
- `value`: Represents the actual value associated with the quote status. */
export const quetosStaticLabel = [
  {label: 'Pending Quote', isSelected: true, value: 'Pending Quote'},
  {label: 'Quotes Received', isSelected: false, value: 'Quotes Received'},
  {label: 'Declined Quotes', isSelected: false, value: 'Decline Quotes'},
];

/**
 * The function `returnStatus` takes a status string as input and returns either 'one_way_status' or
 * 'round_trip_status' based on the input value.
 */
export const returnStatus = (status: string) => {
  return status === QuetosTypeEnum.ONE_WAY
    ? translate('one_way_status')
    : translate('round_trip_status');
};
/**
 * The function `returnTrailerList` takes an array of strings, replaces underscores with spaces and
 * capitalizes the first letter of each word, then joins the modified strings with commas.
 */

export const returnTrailerList = (arr: string[]): string => {
  if (arr) {
    return arr
      .map(item =>
        item.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase()),
      )
      .join(', ');
  }
  return '';
};

/**
 * Formats dates based on flexibility flag.
 * @param startDate - Start date string to format.
 * @param endDate - End date string to format (only used if isFlexible is true).
 * @returns Formatted date string or date range string.
 */
export const setFlexibleDatesForQuetos = (
  startDate: string,
  endDate: string,
): string => {
  return `${DateUtils.convertDateToDaysJs(
    startDate?.toString(),
    DateFormat.MM_DD_YYYY,
  )} ${translate('TO')} ${DateUtils.convertDateToDaysJs(
    endDate?.toString(),
    DateFormat.MM_DD_YYYY,
  )}`;
};

/**
 * Function to convert an array of strings to a formatted string.
 * Each item in the array will have underscores replaced with spaces
 * and the first letter of each word capitalized. The formatted items
 * are then joined with ' - '.
 * @param {string[]} arr - The array of strings to format.
 * @returns {string} - The formatted string.
 */
export const returnHorseTrailerText = (arr: string[]): string => {
  if (arr) {
    return arr
      .map(item =>
        item.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase()),
      )
      .join(' - ');
  }
  return '';
};

/**
 * Converts a phone number into the format (XXX) XXX-XXXX.
 *
 * @param {string} phoneNumber - The phone number to be formatted. It should be in the format +1 XXXXXXXXXX.
 * @returns {string} - The formatted phone number.
 */
export const formatPhoneNumber = (phoneNumber: string) => {
  // Remove any non-digit characters
  const cleaned = phoneNumber.replace(/\D/g, '');

  // Extract area code, central office code, and line number
  const areaCode = cleaned.slice(1, 4); // Extract area code (after the +1)
  const centralOfficeCode = cleaned.slice(4, 7); // Extract central office code
  const lineNumber = cleaned.slice(7); // Extract line number

  // Return formatted phone number
  return `(${areaCode}) ${centralOfficeCode}-${lineNumber}`;
};
