import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const meals = [
  { id: '1', day: 'Monday', meal: 'Chicken and Rice' },
  { id: '2', day: 'Tuesday', meal: 'Beef Stir Fry' },
  { id: '3', day: 'Wednesday', meal: 'Vegetable Pasta' },
  { id: '4', day: 'Thursday', meal: 'Fish and Chips' },
  { id: '5', day: 'Friday', meal: 'Pizza' },
  { id: '6', day: 'Saturday', meal: 'Salad' },
  { id: '7', day: 'Sunday', meal: 'Soup' }
];

const MealPlanScreen = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={meals}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.day}>{item.day}</Text>
            <Text style={styles.meal}>{item.meal}</Text>
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
  }
});

export default MealPlanScreen;