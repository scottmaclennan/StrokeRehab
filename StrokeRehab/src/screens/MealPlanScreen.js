import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const meals = [
  { id: '1', day: 'Monday', meals: { breakfast: 'Oatmeal', lunch: 'Chicken Salad', dinner: 'Chicken and Rice' } },
  { id: '2', day: 'Tuesday', meals: { breakfast: 'Bagel', lunch: 'Beef Sandwich', dinner: 'Beef Stir Fry' } },
  { id: '3', day: 'Wednesday', meals: { breakfast: 'Fruit Salad', lunch: 'Tomato Soup', dinner: 'Vegetable Pasta' } },
  { id: '4', day: 'Thursday', meals: { breakfast: 'Pancakes', lunch: 'Fish Salad', dinner: 'Fish and Chips' } },
  { id: '5', day: 'Friday', meals: { breakfast: 'Yogurt', lunch: 'Pizza Slice', dinner: 'Pizza' } },
  { id: '6', day: 'Saturday', meals: { breakfast: 'Smoothie', lunch: 'Chicken Wrap', dinner: 'Salad' } },
  { id: '7', day: 'Sunday', meals: { breakfast: 'French Toast', lunch: 'Grilled Cheese', dinner: 'Soup' } }
];

const MealPlanScreen = () => {
  const editMeal = (day, type, currentMeal) => {
    Alert.prompt(
      `Edit ${type}`,
      `Current meal for ${day}: ${currentMeal}`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: (newMeal) => updateMeal(day, type, newMeal) },
      ],
      'plain-text',
      currentMeal
    );
  };

  const updateMeal = (day, type, newMeal) => {
    const mealIndex = meals.findIndex(meal => meal.day === day);
    if (mealIndex !== -1) {
      const updatedMeals = [...meals];
      updatedMeals[mealIndex].meals[type] = newMeal;
      console.log(updatedMeals); // In practice, you'd want to use a state to handle this update
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={meals}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.day}>{item.day}</Text>
            {Object.keys(item.meals).map((mealType) => (
              <TouchableOpacity
                key={mealType}
                style={styles.mealItem}
                onPress={() => editMeal(item.day, mealType, item.meals[mealType])}
              >
                <Text style={styles.mealType}>{mealType}: </Text>
                <Text style={styles.meal}>{item.meals[mealType]}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  itemContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  day: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  meal: {
    fontSize: 16
  },
  mealItem: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  mealType: {
    fontWeight: 'bold',
    marginRight: 5,
  }
});

export default MealPlanScreen;
