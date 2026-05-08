import * as yup from 'yup';

import {AppRegex} from '~/constants';
import {translate as t} from '~/localization';

/* This constant `oneWayTripSchema` defines the schema using Yup for validating trip request parameters for a one-way trip.
 * It includes validation rules for `name`, `pickUpDate`, `fullAddress`, `fullDropOffAddress`, and `notes` fields,
 * ensuring they meet specified requirements such as presence, length constraints, and format validation.
 */
export const oneWayTripSchema = yup.object<TripRequestParams>().shape({
  name: yup
    .string()
    .trim()
    .required(t('PLEASE_ENTER_TRIP_NAME'))
    .min(2, t('TRIP_NAME_SHOULD_BE_2_CHAR_LONG'))
    .matches(AppRegex.STRING_ONLY, t('PLEASE_ENTER_VALID_TRIP_NAME')),
  pickUpDate: yup.string().required(t('PLEASE_ENTER_PICK_UP_DATE')),
  fullAddress: yup
    .string()
    .trim()
    .required(t('PLEASE_ENTER_PICK_UP_ADDRESS'))
    .min(2, t('PICK_UP_SHOULD_BE_2_CHAR_LONG')),
  fullDropOffAddress: yup
    .string()
    .trim()
    .required(t('PLEASE_ENTER_DROP_UP_ADDRESS'))
    .min(2, t('PICK_UP_SHOULD_BE_2_CHAR_LONG')),
  notes: yup
    .string()
    .trim()
    .required(t('PLEASE_ENTER_ADDITIONAL_NOTE'))
    .min(2, t('ADDITIONAL_NOTES_SHOULD_BE_2_CHAR_LONG'))
    .max(100, t('ADDITIONAL_NOTES_NOT_MORE_THAN_100_CHAR')),
});

/* This constant `roundWayTripSchema` defines the schema using Yup for validating trip request parameters for a round-way trip.
 * It includes validation rules for `name`, `pickUpDate`, `returnDate`, `fullAddress`, `fullDropOffAddress`,
 * `fullAddressRound`, `fullDropOffAddressRound`, and `notes` fields, ensuring they meet specified requirements
 * such as presence, length constraints, and format validation.
 */
export const roundWayTripSchema = yup.object<TripRequestParams>().shape({
  name: yup
    .string()
    .trim()
    .required(t('PLEASE_ENTER_TRIP_NAME'))
    .min(2, t('TRIP_NAME_SHOULD_BE_2_CHAR_LONG'))
    .matches(AppRegex.STRING_ONLY, t('PLEASE_ENTER_VALID_TRIP_NAME')),
  pickUpDate: yup.string().required(t('PLEASE_ENTER_PICK_UP_DATE')),
  returnDate: yup.string().required(t('PLEASE_ENTER_RETURN_PICK_UP_DATE')),
  fullAddress: yup
    .string()
    .trim()
    .required(t('PLEASE_ENTER_PICK_UP_ADDRESS'))
    .min(2, t('PICK_UP_SHOULD_BE_2_CHAR_LONG')),
  fullDropOffAddress: yup
    .string()
    .trim()
    .required(t('PLEASE_ENTER_DROP_UP_ADDRESS'))
    .min(2, t('PICK_UP_SHOULD_BE_2_CHAR_LONG')),
  fullAddressRound: yup
    .string()
    .trim()
    .required(t('PLEASE_ENTER_END_PICK_UP_ADDRESS'))
    .min(2, t('END_DROP_UP_SHOULD_BE_2_CHAR_LONG')),
  fullDropOffAddressRound: yup
    .string()
    .trim()
    .required(t('PLEASE_ENTER_END_DROP_UP_ADDRESS'))
    .min(2, t('PICK_UP_SHOULD_BE_2_CHAR_LONG')),
  notes: yup
    .string()
    .trim()
    .required(t('PLEASE_ENTER_ADDITIONAL_NOTE'))
    .min(2, t('ADDITIONAL_NOTES_SHOULD_BE_2_CHAR_LONG'))
    .max(100, t('ADDITIONAL_NOTES_NOT_MORE_THAN_100_CHAR')),
});
