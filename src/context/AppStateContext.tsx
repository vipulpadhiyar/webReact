import React, {createContext, useContext, useEffect, useMemo} from 'react';
import {AppState, AppStateStatus, Platform} from 'react-native';
import {focusManager} from '@tanstack/react-query';

// Define the context shape
interface AppStateContextType {}

// Create the context
const AppStateContext = createContext<AppStateContextType>({});

// Custom hook to access the context
export const useAppState = () => useContext(AppStateContext);

// AppState props interface
interface AppStateProviderProps {
  children: React.JSX.Element | React.JSX.Element[];
}

// Component to provide the AppState context
export const AppStateProvider = (props: AppStateProviderProps) => {
  const {children} = props;

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      (status: AppStateStatus) => {
        if (Platform.OS !== 'web') {
          focusManager.setFocused(status === 'active');
        }
      },
    );
    return () => subscription.remove();
  }, []);

  const values = useMemo(() => {
    return {};
  }, []);

  return (
    <AppStateContext.Provider value={values}>
      {children}
    </AppStateContext.Provider>
  );
};
