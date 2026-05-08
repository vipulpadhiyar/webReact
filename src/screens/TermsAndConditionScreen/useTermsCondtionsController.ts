import {useEffect, useState} from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';

import Loader from '~/helpers/Loader';
import {useGetTermsPrivacyAction} from '~/store';
import {log, showError} from '~/utils';

/**
 * The `useTermsCondtionsController` function returns an object with  onBack
 * properties for handling PrivacyPolicy functionality in a TypeScript application.
 */

export const useTermsCondtionsController = () => {
  /* The code snippet you provided is a custom hook called `useTermsCondtionsController` that is used to
handle the Terms Nd Condtions functionality in a TypeScript application. Here is a breakdown of what
each part of the code is doing: */
  const navigation = useNavigation<NavigationProp<ProfileStackParamList>>();
  const [htmlStr, setHtmlStr] = useState<string>('');
  const {mutateAsync: getPrivacy} = useGetTermsPrivacyAction();

  useEffect(() => {
    getTermsCondtionsApi();
    return () => {};
  }, []);

  const getTermsCondtionsApi = async () => {
    let req: CMSTermsPrivacyRequest = {
      cmsType: 'cms',
      titleKey: 'termsAndCond',
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
