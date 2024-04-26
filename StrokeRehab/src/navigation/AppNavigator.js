import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import MealPlanScreen from '../screens/MealPlanScreen';
import ExerciseScreen from '../screens/ExerciseScreen';
import MedicationScreen from '../screens/MedicationScreen';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="FoodPlanner" component={MealPlanScreen} />
      <Stack.Screen name="ExercisePlanner" component={ExerciseScreen} />
      <Stack.Screen name="MedicationPlanner" component={MedicationScreen} />
    </Stack.Navigator>
  );
}

export default AppNavigator;
