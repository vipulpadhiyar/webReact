import {Platform} from 'react-native';

import {AppSpacing} from './app.spacing';

export const AppConstants = {
  IS_LOG_ENABLE: true,
  BOTTOM_SPACE: AppSpacing[16],
  MODEL_DELAY: 600,
  PAGE_LIST_SIZE: 20,
  ON_END_REACHED_THRESHOLD: 0.3,
  PLATFORM_OS: Platform.OS,
  NOTIFICATION_CHANNEL_ID: 'MSR_HO',

  TERMS_CONDITION_URL:
    'https://react-msr-web.agiletechnologies.in/terms-condition',
  PRIVACY_POLICY_URL:
    'https://react-msr-web.agiletechnologies.in/privacy-policy',
  REVIEW_TEXT_LIMIT: 301,
};

export const dropDownFormatData = (list: string[]) => {
  return list.map((item, _) => {
    return {value: item, label: item};
  });
};
