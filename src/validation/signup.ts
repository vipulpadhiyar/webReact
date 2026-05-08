import * as yup from 'yup';

import {AppRegex} from '~/constants';
import {translate as t} from '~/localization';

/* This code snippet is defining a schema using Yup for validating a sign-up form. Here's a breakdown
of what each part of the schema is doing: */

export const SignUpSchema = yup.object<SignUpFormParamsType>().shape({
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
  email: yup
    .string()
    .matches(AppRegex.EMAIL, t('PleaseEnterValidEmailAddress'))
    .required(t('PleaseEnterEmailId')),
  password: yup
    .string()
    .required(t('PleaseEnterPassword'))
    .matches(AppRegex.PASSWORD, t('PasswordMustBe'))
    .min(8, t('PasswordMustBe')),
  confirmPassword: yup
    .string()
    .required(t('PleaseEnterConfirmPassword'))
    .oneOf([yup.ref('password')], t('ConfirmPasswordNotMatchWithPassword'))
    .matches(AppRegex.PASSWORD, t('PasswordMustBe'))
    .min(8, t('PasswordMustBe')),
  termsChecked: yup
    .boolean()
    .isTrue(t('PleaseSelectTerms&Conditions'))
    .required(),
});
