import * as yup from 'yup';

import {AppRegex} from '~/constants';
import {translate as t} from '~/localization';

export const ChangePasswordSchema = yup
  .object<EditProfileFormParamsType>()
  .shape({
    oldPassword: yup
      .string()
      .required(t('PleaseEnteryouroldpassword'))
      .matches(AppRegex.PASSWORD, t('PasswordMustBe'))
      .min(8, t('PasswordMustBe')),
    newPassword: yup
      .string()
      .required(t('PleaseEnteryournewpassword'))
      .notOneOf(
        [yup.ref('oldPassword')],
        t('Newpasswordoldpasswordshouldnotbesame'),
      )
      .matches(AppRegex.PASSWORD, t('PasswordMustBe'))
      .min(8, t('PasswordMustBe')),
    confirmPassword: yup
      .string()
      .oneOf(
        [yup.ref('newPassword')],
        t('Confirmpassworddoesntmatchwithnewpassword'),
      )
      .required(t('PleaseEnterconfirmpassword'))
      .matches(AppRegex.PASSWORD, t('PasswordMustBe'))
      .min(8, t('PasswordMustBe')),
  });
