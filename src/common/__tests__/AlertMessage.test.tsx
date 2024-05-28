import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import AlertMessage from '../AlertMessage';

describe('AlertMessage', () => {
  it('renders with the given message and title, and hides the modal on button press', async () => {
    const { getByText, queryByText } = render(
      <AlertMessage message="Test Message" title="Test Title" />
    );

    expect(getByText('Test Title')).toBeTruthy();
    expect(getByText('Test Message')).toBeTruthy();

    const button = getByText('Entendido');
    fireEvent.press(button);
    
    await waitFor(() => {
      expect(queryByText('Test Title')).toBeNull();
      expect(queryByText('Test Message')).toBeNull();
    });
  });
});
