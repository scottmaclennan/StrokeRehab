import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import ExerciseScreen from './ExerciseScreen'; // Adjust the import path as necessary

jest.mock('expo-notifications', () => ({
    scheduleNotificationAsync: jest.fn(),
  }));
  

describe('ExerciseScreen', () => {
  it('renders correctly', () => {
    const { getByText, getAllByText } = render(<ExerciseScreen />);
    expect(getByText('New Exercise Title')).toBeTruthy();
    expect(getByText('New Exercise Description')).toBeTruthy();
    expect(getAllByText('Start').length).toBe(2); // Checks initial exercises are rendered with start buttons
  });

  it('adds a new exercise when input fields are filled and add button is pressed', () => {
    const { getByText, getByPlaceholderText, queryByText } = render(<ExerciseScreen />);
    fireEvent.changeText(getByPlaceholderText('New Exercise Title'), 'Jogging');
    fireEvent.changeText(getByPlaceholderText('New Exercise Description'), 'Jog for 30 minutes');
    fireEvent.press(getByText('Add Exercise'));
    expect(queryByText('Jogging')).toBeTruthy();
    expect(queryByText('Jog for 30 minutes')).toBeTruthy();
  });

  it('shows an alert if add button is pressed with empty inputs', () => {
    jest.spyOn(global, 'Alert.alert');
    const { getByText } = render(<ExerciseScreen />);
    fireEvent.press(getByText('Add Exercise'));
    expect(global.Alert.alert).toHaveBeenCalledWith('Error', 'Both title and description must be filled out.');
  });
});


it('starts and stops timer correctly', async () => {
    jest.useFakeTimers();
    const { getByText, getAllByText } = render(<ExerciseScreen />);
    const startButtons = getAllByText('Start');
    fireEvent.press(startButtons[0]); // Start timer for the first exercise
    
    act(() => {
      jest.advanceTimersByTime(3000); // Simulate 3 seconds passing
    });
  
    expect(getByText('Timer: 3 Seconds')).toBeTruthy();
  
    const stopButtons = getAllByText('Stop');
    fireEvent.press(stopButtons[0]); // Stop timer
    jest.useRealTimers();
  });
  