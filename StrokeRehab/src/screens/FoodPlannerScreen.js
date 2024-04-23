import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const FoodPlannerScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Welcome to the Food Planner App!</Text>
      <Button
        title="Go to Meal Plan"
        onPress={() => navigation.navigate('MealPlan')}
      />
      <Button
        title="View Grocery List"
        onPress={() => navigation.navigate('GroceryList')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FoodPlannerScreen;