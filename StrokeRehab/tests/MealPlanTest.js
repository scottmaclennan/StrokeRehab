import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MealPlanScreen from './MealPlanScreen'; 

describe('MealPlanScreen', () => {
  it('renders the initial meal plan correctly', () => {
    const { getByText } = render(<MealPlanScreen />);
    expect(getByText('Monday')).toBeTruthy();
    expect(getByText('Oatmeal')).toBeTruthy(); // Check if the breakfast for Monday is rendered
    // Repeat for other days or meals as necessary
  });
});


it('opens and closes the modal correctly', () => {
    const { getByText, queryByText } = render(<MealPlanScreen />);
    const mealItem = getByText('Oatmeal');
    fireEvent.press(mealItem); // Simulates pressing a meal item to open the modal
    expect(queryByText('Enter meal')).toBeTruthy(); // Check if the modal is open
  
    const cancelButton = getByText('Cancel');
    fireEvent.press(cancelButton); // Simulates pressing the cancel button
    expect(queryByText('Enter meal')).toBeFalsy(); // Modal should no longer be visible
  });
  

it('allows editing a meal and updating the list', () => {
    const { getByText, getByPlaceholderText, queryByText } = render(<MealPlanScreen />);
    fireEvent.press(getByText('Oatmeal')); // Open the modal
    const input = getByPlaceholderText('Enter meal');
    fireEvent.changeText(input, 'Scrambled Eggs'); // Change the meal
    fireEvent.press(getByText('Save Changes')); // Save the change
  
    expect(queryByText('Oatmeal')).toBeFalsy();
    expect(getByText('Scrambled Eggs')).toBeTruthy(); // New meal should be visible
  });
  

it('responds to save meal plan button press', () => {
    jest.spyOn(global, 'alert'); // Spy on the global alert function
    const { getByText } = render(<MealPlanScreen />);
    fireEvent.press(getByText('Save Meal Plan'));
    expect(global.alert).toHaveBeenCalledWith('Meal plan saved!');
  });
  