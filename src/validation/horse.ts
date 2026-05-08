import * as yup from 'yup';

import {AppRegex} from '~/constants';
import {translate as t} from '~/localization';

/* This code snippet is defining a schema using Yup for validating the data of a horse profile to be
added. Here's a breakdown of what the schema is doing: */
export const AddHorseSchema = yup.object<AddHorseProfile>().shape({
  name: yup
    .string()
    .required(t('PleaseAddHorseName'))
    .min(2, t('HorseNameShouldBe'))
    .matches(AppRegex.EMPTY_SPACE, t('PleaseAddValidHorseName'))
    .matches(AppRegex.NO_NUM_SPECIAL_CHAR, t('PleaseAddValidHorseName')),
  barnName: yup
    .string()
    .required(t('PleaseAddHorseBarnName'))
    .min(2, t('HorseBarnNameShouldBe'))
    .matches(AppRegex.EMPTY_SPACE, t('PleaseAddValidHorseBarnName'))
    .matches(AppRegex.NO_NUM_SPECIAL_CHAR, t('PleaseAddValidHorseBarnName')),
  birthYear: yup.string().required(t('PleaseSelectHorseBirthYear')),
  breed: yup.string().required(t('PleaseSelectHorseBreed')),
  gender: yup.string().required(t('PleaseSelectHorseGender')),
  color: yup.string().required(t('PleaseSelectHorseColor')),
  height: yup
    .string()
    .required(t('PleaseAddHorseHeight'))
    .matches(AppRegex.HORSE_HEIGHT, t('HorseHeightMustBe')),
  note: yup
    .string()
    .required(t('PleaseAddNote'))
    .max(500, t('MaxCharLimit500')),
  images: yup.array().optional(),
});

export const EditHorseSchema = yup.object<EditHorseProfile>().shape({
  name: yup
    .string()
    .required(t('PleaseAddHorseName'))
    .min(2, t('HorseNameShouldBe'))
    .matches(AppRegex.EMPTY_SPACE, t('PleaseAddValidHorseName'))
    .matches(AppRegex.NO_NUM_SPECIAL_CHAR, t('PleaseAddValidHorseName')),
  barnName: yup
    .string()
    .required(t('PleaseAddHorseBarnName'))
    .min(2, t('HorseBarnNameShouldBe'))
    .matches(AppRegex.EMPTY_SPACE, t('PleaseAddValidHorseBarnName'))
    .matches(AppRegex.NO_NUM_SPECIAL_CHAR, t('PleaseAddValidHorseBarnName')),
  birthYear: yup.string().required(t('PleaseSelectHorseBirthYear')),
  breed: yup.string().required(t('PleaseSelectHorseBreed')),
  gender: yup.string().required(t('PleaseSelectHorseGender')),
  color: yup.string().required(t('PleaseSelectHorseColor')),
  height: yup
    .string()
    .required(t('PleaseAddHorseHeight'))
    .matches(AppRegex.HORSE_HEIGHT, t('HorseHeightMustBe')),
  note: yup
    .string()
    .required(t('PleaseAddNote'))
    .max(500, t('MaxCharLimit500')),
  images: yup.array().optional(),
});
