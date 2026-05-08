import {useEffect, useState} from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';

import Loader from '~/helpers/Loader';
import {useGetTermsPrivacyAction} from '~/store';
import {log, showError} from '~/utils';

/**
 * The `usePrivacyPolicyController` function returns an object with  onBack, htmlStr
 * properties for handling PrivacyPolicy functionality in a TypeScript application.
 */

export const usePrivacyPolicyController = () => {
  const navigation = useNavigation<NavigationProp<ProfileStackParamList>>();
  const [htmlStr, setHtmlStr] = useState<string>('');
  const {mutateAsync: getPrivacy} = useGetTermsPrivacyAction();

  useEffect(() => {
    getPrivacyApi().then(() => {});
    return () => {};
  }, []);

  const getPrivacyApi = async () => {
    let req: CMSTermsPrivacyRequest = {
      cmsType: 'cms',
      titleKey: 'privacyPolicy',
    };
    Loader.showLoader();
    try {
      let response = await getPrivacy(req);
      Loader.hideLoader();
      if (response) {
        log(response);
        setHtmlStr(response.data.titleValue);
      }
    } catch (error: any) {
      Loader.hideLoader();
      showError(error);
    }
  };

  /**
   * The `onBack` function is used to navigate back in a TypeScript application.
   */

  const onBack = () => {
    navigation.goBack();
  };

  return {
    onBack,
    htmlStr,
  };
};
