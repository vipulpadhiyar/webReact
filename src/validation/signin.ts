import * as yup from 'yup';

import {AppRegex} from '~/constants';
import {translate as t} from '~/localization';
/* This code snippet is defining a schema using Yup for validating a sign-in form. Here's a breakdown
of what it does: */

export const SignInSchema = yup.object<SignInFormParamsType>().shape({
  email: yup
    .string()
    .required(t('PleaseEnterEmailAddress'))
    .matches(AppRegex.EMAIL, t('PleaseEnterValidEmailAddress')),
  password: yup
    .string()
    .required(t('PleaseEnterPassword'))
    .matches(AppRegex.PASSWORD, t('PasswordMustBe'))
    .min(8, t('PasswordMustBe')),
});

/* This code snippet is defining a schema using Yup for validating a form related to forgot password
functionality. */
export const ForgotPasswordSchema = yup
  .object<ForgotPasswordFormParamsType>()
  .shape({
    email: yup
      .string()
      .required(t('PleaseEnterEmailAddress'))
      .matches(AppRegex.EMAIL, t('PleaseEnterValidEmailAddress')),
  });
