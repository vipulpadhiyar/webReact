import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import io, {Socket} from 'socket.io-client';

import {AppEnvironment} from '~/constants';
import {SOCKET_DEFAULT_EVENTS, SOCKET_EVENTS} from '~/constants/api.endpoints';
import {Storage} from '~/helpers';
import {isDev, log, showSuccess} from '~/utils';

// Define the context shape
interface SocketContextType {
  socket: Socket | null;
  isUserConnected: boolean;
  disconnectSocket: () => void;
  connectSocket: () => void;
  setIsUserConnected: (bool: boolean) => void;
  connectUser: () => Promise<boolean>;
  connectListener: (callback?: () => void) => void;
  reconnectListener: (callback?: () => void) => void;
  disconnectListener: (callback?: () => void) => void;
  offAllCustomEvents: () => void;
  offAllDefaultEvents: () => void;
}

// Create the context
const SocketContext = createContext<SocketContextType>({
  socket: null,
  isUserConnected: false,
  connectSocket: () => {},
  disconnectSocket: () => {},
  setIsUserConnected: () => {},
  connectUser: () => new Promise((resolve, _) => resolve(false)),
  connectListener: () => {},
  disconnectListener: () => {},
  offAllCustomEvents: () => {},
  offAllDefaultEvents: () => {},
  reconnectListener: () => {},
});

// Custom hook to access the context
export const useSocket = () => useContext(SocketContext);

// Socket props interface
interface SocketProviderProps {
  children: React.JSX.Element | React.JSX.Element[];
}

// socket instance with some optional parameter which may change depend upon app requirements
const socket = io(AppEnvironment.secure.base_url, {
  autoConnect: true,
  reconnection: true,
});

// Component to provide the socket context
export const SocketProvider = (props: SocketProviderProps) => {
  const {children} = props;

  // connection flag which indicated whether user is connected with specific room or not.
  const [isUserConnected, setIsUserConnected] = useState<boolean>(false);

  // make connection request to socket server
  const connectSocket = () => {
    socket?.connect();
  };

  /**
   * The `connectListener` function sets up a listener for a socket connection event and executes a
   * callback function when the connection is established.
   */
  const connectListener = (callback?: () => void) => {
    socket.on(SOCKET_DEFAULT_EVENTS.CONNECT, () => {
      log('Connect');
      if (callback && typeof callback === 'function') {
        callback();
        if (isDev()) {
          showSuccess('Event.CONNECT');
        }
      }
    });
  };

  /**
   * The `reconnectListener` function sets up a listener for a socket go for reconnection event and executes a
   * callback function when the reconnection is triggered.
   */
  const reconnectListener = (callback?: () => void) => {
    socket.on(SOCKET_DEFAULT_EVENTS.RECONNECTING_ATTEMPT, () => {
      if (callback && typeof callback === 'function') {
        callback();
      }
    });
  };

  /**
   * The `disconnectListener` function sets up a listener for a socket disconnection event and executes a
   * callback function when the disconnection is established.
   */
  const disconnectListener = (callback?: () => void) => {
    socket.on(SOCKET_DEFAULT_EVENTS.DISCONNECT, () => {
      if (callback && typeof callback === 'function') {
        callback();
      }
    });
  };

  /**
   * The function `disconnectSocket` disconnects the current socket if it exists.
   */
  const disconnectSocket = () => {
    socket?.disconnect();
  };

  /**
   * The function `connectSocket` disconnects the current socket if it exists.
   */
  const connectUser = (): Promise<boolean> => {
    return new Promise((resolve, _) => {
      socket?.emit(
        SOCKET_EVENTS.USER_CONNECTED,
        {
          userId: Storage.getUserData()?._id ?? '',
        },
        (response: any) => {
          setIsUserConnected(true);
          resolve(true);
          if (isDev()) {
            showSuccess(`User CONNECT ${JSON.stringify(response)}`);
          }
        },
      );
    });
  };

  /**
   * The function `offAllCustomEvents` iterates through all values of `SOCKET_EVENTS` and removes event
   * listeners for each value from the `socket` object.
   */
  const offAllCustomEvents = () => {
    Object.values(SOCKET_EVENTS).forEach(key => socket?.off(key));
  };

  /**
   * The function `offAllDefaultEvents` iterates over all default events in `SOCKET_DEFAULT_EVENTS` and
   * removes event listeners for each event from the `socket` object.
   */
  const offAllDefaultEvents = () => {
    Object.values(SOCKET_DEFAULT_EVENTS).forEach(key => socket?.off(key));
  };

  /* The `useEffect` hook in the code snippet is setting up event listeners for socket connection,
  disconnection, and reconnection when the component mounts. It also returns a cleanup function that
  removes all event listeners when the component unmounts. */
  useEffect(() => {
    connectListener();
    disconnectListener();
    reconnectListener();
    return () => {
      offAllDefaultEvents();
      offAllCustomEvents();
    };
  }, []);

  const values = useMemo(() => {
    return {
      isUserConnected,
      socket,
      disconnectSocket,
      connectSocket,
      setIsUserConnected,
      connectUser,
      connectListener,
      disconnectListener,
      offAllCustomEvents,
      offAllDefaultEvents,
      reconnectListener,
    };
  }, [
    isUserConnected,
    socket,
    disconnectSocket,
    connectSocket,
    setIsUserConnected,
    connectUser,
    connectListener,
    disconnectListener,
    offAllCustomEvents,
    offAllDefaultEvents,
    reconnectListener,
  ]);

  return (
    <SocketContext.Provider value={values}>{children}</SocketContext.Provider>
  );
};
