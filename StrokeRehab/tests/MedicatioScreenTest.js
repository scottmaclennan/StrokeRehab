import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import MedicationScreen from './MedicationScreen'; // Update the import path accordingly

describe('MedicationScreen', () => {
  it('renders correctly with initial empty state', () => {
    const { getByPlaceholderText, getByText } = render(<MedicationScreen />);
    expect(getByPlaceholderText('Medication name')).toBeTruthy();
    expect(getByPlaceholderText('Time (e.g., 8:00 AM)')).toBeTruthy();
    expect(getByPlaceholderText('Quantity (e.g., 2 pills)')).toBeTruthy();
    expect(getByText('Add Medication')).toBeTruthy();
  });
});

it('allows adding a medication when all fields are filled', async () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<MedicationScreen />);
    
    fireEvent.changeText(getByPlaceholderText('Medication name'), 'Ibuprofen');
    fireEvent.changeText(getByPlaceholderText('Time (e.g., 8:00 AM)'), '08:00');
    fireEvent.changeText(getByPlaceholderText('Quantity (e.g., 2 pills)'), '2');
    fireEvent.press(getByText('Monday')); // Toggle Monday
    fireEvent.press(getByText('Add Medication'));
  
    await waitFor(() => {
      expect(queryByText('Ibuprofen')).toBeTruthy();
      expect(queryByText('2 at 08:00')).toBeTruthy();
      expect(queryByText('Days: Monday')).toBeTruthy();
    });
  
    // Verify that the notification scheduling function was called
    expect(Notifications.scheduleNotificationAsync).toHaveBeenCalled();
  });

  it('toggles day selection correctly', () => {
    const { getByText } = render(<MedicationScreen />);
    fireEvent.press(getByText('Monday'));
    fireEvent.press(getByText('Tuesday'));
    fireEvent.press(getByText('Monday')); // Toggle Monday off again
  
    // Use a custom matcher from @testing-library/jest-native to verify style changes
    expect(getByText('Monday')).toHaveStyle({ backgroundColor: 'white' });
    expect(getByText('Tuesday')).toHaveStyle({ backgroundColor: '#4CAF50' });
  });

  // Example: Ensure the add button does not proceed with empty inputs
it('does not add medication with empty fields', () => {
    const { getByText } = render(<MedicationScreen />);
    fireEvent.press(getByText('Add Medication'));
    // Assuming you have logic to prevent addition, check that no new list item is rendered
    // This is a placeholder for whatever logic you might have to indicate an error or empty fields
  });
  
  
  