import { render } from 'test/utils';
import { describe, test } from 'vitest';

import Dashboard from '.';

describe('Dashboard', () => {
  test('Dashboard page should render correctly', () => {
    render(<Dashboard />);
  });
});
