import React from 'react';
import { render } from '@testing-library/react-native';
import HomeScreen from './HomeScreen';

describe('HomeScreen', () => {
  it('renders the welcome text and buttons correctly', () => {
    const mockNavigation = { navigate: jest.fn() };
    const { getByText } = render(<HomeScreen navigation={mockNavigation} />);

    expect(getByText('Welcome to StrokeRehab')).toBeTruthy();
    expect(getByText('Food Planner')).toBeTruthy();
    expect(getByText('Medical Tracker')).toBeTruthy();
    expect(getByText('Exercise Planner')).toBeTruthy();
  });
});

it('navigates to Food Planner when the corresponding button is pressed', () => {
    const mockNavigation = { navigate: jest.fn() };
    const { getByText } = render(<HomeScreen navigation={mockNavigation} />);
    
    const foodPlannerButton = getByText('Food Planner');
    fireEvent.press(foodPlannerButton);
    expect(mockNavigation.navigate).toHaveBeenCalledWith('FoodPlanner');
  });
  
  it('navigates to Medication Planner when the corresponding button is pressed', () => {
    const mockNavigation = { navigate: jest.fn() };
    const { getByText } = render(<HomeScreen navigation={mockNavigation} />);
    
    const medicationPlannerButton = getByText('Medical Tracker');
    fireEvent.press(medicationPlannerButton);
    expect(mockNavigation.navigate).toHaveBeenCalledWith('MedicationPlanner');
  });
  
  it('navigates to Exercise Planner when the corresponding button is pressed', () => {
    const mockNavigation = { navigate: jest.fn() };
    const { getByText } = render(<HomeScreen navigation={mockNavigation} />);
    
    const exercisePlannerButton = getByText('Exercise Planner');
    fireEvent.press(exercisePlannerButton);
    expect(mockNavigation.navigate).toHaveBeenCalledWith('ExercisePlanner');
  });
  
  
