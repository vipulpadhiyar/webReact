import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { cleanup, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { afterEach, vi } from 'vitest';

afterEach(() => {
  cleanup();
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      notifyOnChangeProps: 'all'
      // notifyOnChangeProps: 'tracked'
    }
  }
});

function customRender(ui: React.ReactElement, options = {}) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // Deprecated
      removeListener: vi.fn(), // Deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn()
    }))
  });
  return render(ui, {
    // wrap provider(s) here if needed
    wrapper: ({ children }) => (
      <QueryClientProvider client={queryClient}>
        {/* <Provider store={store}> */}
        <BrowserRouter>{children}</BrowserRouter>
        {/* </Provider> */}
      </QueryClientProvider>
    ),
    ...options
  });
}

// override render export
export { customRender as render };
