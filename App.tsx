import React from 'react';
import {PersistQueryClientProvider} from '@tanstack/react-query-persist-client';

import Root from '~/Root';
import {clientPersister, queryClient} from '~/store';

/**
 * Represents the root component of the application.
 * @returns {JSX.Element} - React element.
 */
function App(): React.JSX.Element {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{persister: clientPersister}}>
      <Root />
    </PersistQueryClientProvider>
  );
}

export default App;
