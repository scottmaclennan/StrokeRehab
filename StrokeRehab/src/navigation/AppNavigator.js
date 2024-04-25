import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import MealPlanScreen from '../screens/MealPlanScreen';
import GroceryListScreen from '../screens/GroceryListScreen';
import AppointmentDetailScreen from '../screens/AppointmentDetailScreen';
import ExerciseScreen from '../screens/ExerciseScreen';
import MedicationScreen from '../screens/MedicationScreen';
import SymptomDairyScreen from '../screens/SymptomDairyScreen';


const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="FoodPlanner" component={MealPlanScreen} />
      <Stack.Screen name="AppointmentDetailScreen" component={AppointmentDetailScreen} />
      <Stack.Screen name="ExercisePlanner" component={ExerciseScreen} />
      <Stack.Screen name="MedicationPlanner" component={MedicationScreen} />
      <Stack.Screen name="SymptomDairyScreen" component={SymptomDairyScreen} />
      <Stack.Screen name="GroceryList" component={GroceryListScreen} />
    </Stack.Navigator>
  );
}

export default AppNavigator;
