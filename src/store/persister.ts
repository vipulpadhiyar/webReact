import {createSyncStoragePersister} from '@tanstack/query-sync-storage-persister';
import {PersistedClient} from '@tanstack/react-query-persist-client';

import {MutationQueryKeys, QueryKeys} from '~/constants';
import {storage} from '~/helpers';

// storage engine methods for persister state.
const clientStorage = {
  setItem: (key: string, value: string | number | boolean | Uint8Array) => {
    storage.set(key, value);
  },
  getItem: (key: string) => {
    const value = storage.getString(key);
    return value === undefined ? null : value;
  },
  removeItem: (key: string) => {
    storage.delete(key);
  },
};

// please add useQuery keys which you want to persist in state
const whiteLitsQueryKeys: string[] = [QueryKeys.getConfig];

// please add useMutation keys which you want to persist in state
const whiteListMutationKeys: string[] = [MutationQueryKeys.signInMutate];

// object that contains all key value which we want to store in persist state.
const whiteListedKeys: string[] = [
  ...Object.values(whiteLitsQueryKeys),
  ...Object.values(whiteListMutationKeys),
];

export const clientPersister = createSyncStoragePersister({
  storage: clientStorage,
  serialize: client => {
    // Serialize only specific keys from the query client's state
    const serializedState: PersistedClient = {
      buster: client.buster,
      clientState: {
        mutations: [],
        queries: [],
      },
      timestamp: client.timestamp,
    };
    whiteListedKeys.forEach(key => {
      const mutation = client.clientState.mutations.find(obj =>
        obj.mutationKey?.includes(key),
      );
      const query = client.clientState.queries.find(obj =>
        obj.queryKey?.includes(key),
      );
      if (mutation) {
        serializedState.clientState.mutations.push(mutation);
      }
      if (query) {
        serializedState.clientState.queries.push(query);
      }
    });
    return JSON.stringify(serializedState);
  },
  deserialize: serializedState => {
    const deserializedState = JSON.parse(serializedState);
    return deserializedState;
  },
});
