import React from 'react';
import { render } from '@testing-library/react';
import Sidebar from '../Sidebar';

test('sidebar open', () => {
  const { getByText } = render(<Sidebar open={true}>sidebar shown</Sidebar>);
  const showText = getByText(/sidebar shown/i);
  expect(showText).toBeInTheDocument();
});
