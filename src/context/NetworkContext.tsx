import React, {createContext, useContext, useEffect, useMemo} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {onlineManager} from '@tanstack/react-query';

// Define the context shape
interface NetworkContextType {}

// Create the context
const NetworkContext = createContext<NetworkContextType>({});

// Custom hook to access the context
export const useNetwork = () => useContext(NetworkContext);

// Network props interface
interface NetworkProviderProps {
  children: React.JSX.Element | React.JSX.Element[];
}

// Component to provide the Network context
export const NetworkProvider = (props: NetworkProviderProps) => {
  const {children} = props;

  useEffect(() => {
    onlineManager.setEventListener(setOnline => {
      return NetInfo.addEventListener(state => {
        setOnline(!!state.isInternetReachable);
      });
    });
  }, []);

  const values = useMemo(() => {
    return {};
  }, []);

  return (
    <NetworkContext.Provider value={values}>{children}</NetworkContext.Provider>
  );
};
