import React, {
  forwardRef,
  memo,
  Ref,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import CountryPicker, {
  Country,
  CountryCode,
} from 'react-native-country-picker-modal';

import {AppFonts, AppFontSizes} from '~/constants';

/*
  The `interface AppCountryCodePickerModalProps` is receive a prop called
  `onConfirm` which is a function that takes a `Country`
  object as an argument and returns `void`
*/
interface AppCountryCodePickerModalProps {
  onConfirm: (country: Country) => void;
}

export interface RefAppCountryCodePickerModalProps {
  open: () => void;
  close: () => void;
}

export const AppCountryCodePickerModalModal = memo(
  forwardRef(
    (
      props: AppCountryCodePickerModalProps,
      ref: Ref<RefAppCountryCodePickerModalProps | undefined>,
    ) => {
      const {onConfirm} = props;

      const [isModelVisible, setIsModelVisible] = useState<boolean>(false);
      const [cca2, setCca2] = useState<CountryCode>('US');

      const open = useCallback(() => {
        setIsModelVisible(true);
      }, []);

      const close = useCallback(() => {
        setIsModelVisible(false);
      }, []);

      const selectCountry = useCallback((country: Country): void => {
        onConfirm(country);
        setCca2(country.cca2);
        close();
      }, []);

      useImperativeHandle(ref, () => ({
        // methods connected to `ref`
        open: () => open(),
        close: () => close(),
      }));

      return (
        <CountryPicker
          withFilter={true}
          onSelect={selectCountry}
          withModal={true}
          countryCode={cca2}
          theme={{
            fontFamily: AppFonts.GentiumBasic_Regular,
            fontSize: AppFontSizes[15],
          }}
          renderFlagButton={() => <></>}
          withCallingCode={true}
          visible={isModelVisible}
          onClose={close}
        />
      );
    },
  ),
);
