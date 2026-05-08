import * as yup from 'yup';

import {AppRegex} from '~/constants';
import {translate as t} from '~/localization';

/* This code snippet is defining a schema using Yup for validating a sign-up form. Here's a breakdown
of what each part of the schema is doing: */

export const EditProfileSchema = yup.object<EditProfileFormParamsType>().shape({
  firstName: yup
    .string()
    .required(t('PleaseEnterFirstName'))
    .min(2, t('FirstNameAtLeast2CharLong'))
    .matches(AppRegex.NO_NUM_SPECIAL_CHAR, t('PleaseEnterValidFirstName')),
  lastName: yup
    .string()
    .required(t('PleaseEnterLastName'))
    .min(2, t('LastNameAtLeast2CharLong'))
    .matches(AppRegex.NO_NUM_SPECIAL_CHAR, t('PleaseEnterValidLastName')),
});
