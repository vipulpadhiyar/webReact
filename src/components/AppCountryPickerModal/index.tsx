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

/* The `interface AppCountryPickerModalProps` is defining a TypeScript interface in the React component
`AppCountryPickerModal`. This interface specifies the props that the `AppCountryPickerModal`
component expects to receive. In this case, it defines a single prop `onConfirm` which is a function
that takes a `Country` object as an argument and does not return anything (`void`). */
interface AppCountryPickerModalProps {
  onConfirm: (country: Country) => void;
}

/* The `export interface RefAppCountryPickerModalProps` is defining a TypeScript interface that
specifies the shape of the properties that a parent component can access when it holds a reference
to the `AppCountryPickerModal` component. In this case, it defines two properties: */
export interface RefAppCountryPickerModalProps {
  open: () => void;
  close: () => void;
}

/* This code snippet is defining a React functional component called `AppCountryPickerModal` using
TypeScript. Let's break down what each part of the code is doing: */
export const AppCountryPickerModal = memo(
  forwardRef(
    (
      props: AppCountryPickerModalProps,
      ref: Ref<RefAppCountryPickerModalProps | undefined>,
    ) => {
      const {onConfirm} = props;

      const [isModelVisible, setIsModelVisible] = useState<boolean>(false);
      const [cca2, setCca2] = useState<CountryCode>('US');

      /* The `const open = useCallback(() => { setIsModelVisible(true); }, []);` code snippet is
     defining a function named `open` using the `useCallback` hook in React. */
      const open = useCallback(() => {
        setIsModelVisible(true);
      }, []);

      /* The `const close = useCallback(() => { setIsModelVisible(false); }, []);` code snippet is
     defining a function named `close` using the `useCallback` hook in React. This function sets the
     state variable `isModelVisible` to `false`, effectively closing the modal or hiding the
     component associated with it. The `useCallback` hook is used to memoize the function `close` so
     that it remains the same reference between renders unless its dependencies change. This can
     help with performance optimization in certain scenarios. */
      const close = useCallback(() => {
        setIsModelVisible(false);
      }, []);

      const selectCountry = useCallback((country: Country): void => {
        onConfirm(country);
        setCca2(country.cca2);
        close();
      }, []);

      /* `useImperativeHandle` is a React hook that allows a parent component to interact with a child
      component's instance. In this case, the `useImperativeHandle` hook is used to define what
      functions or methods should be exposed to the parent component when it has a reference to the
      `AppCountryPickerModal` component. */
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
          visible={isModelVisible}
          onClose={close}
        />
      );
    },
  ),
);
