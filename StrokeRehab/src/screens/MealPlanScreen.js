import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, TextInput, Button } from 'react-native';

const initialMeals = [
  { id: '1', day: 'Monday', meals: { breakfast: 'Oatmeal', lunch: 'Chicken Salad', dinner: 'Chicken and Rice' } },
  { id: '2', day: 'Tuesday', meals: { breakfast: 'Bagel', lunch: 'Beef Sandwich', dinner: 'Beef Stir Fry' } },
  { id: '3', day: 'Wednesday', meals: { breakfast: 'Fruit Salad', lunch: 'Tomato Soup', dinner: 'Vegetable Pasta' } },
  { id: '4', day: 'Thursday', meals: { breakfast: 'Pancakes', lunch: 'Fish Salad', dinner: 'Fish and Chips' } },
  { id: '5', day: 'Friday', meals: { breakfast: 'Yogurt', lunch: 'Pizza Slice', dinner: 'Pizza' } },
  { id: '6', day: 'Saturday', meals: { breakfast: 'Smoothie', lunch: 'Chicken Wrap', dinner: 'Salad' } },
  { id: '7', day: 'Sunday', meals: { breakfast: 'French Toast', lunch: 'Grilled Cheese', dinner: 'Soup' } }
];

const MealPlanScreen = () => {
  const [meals, setMeals] = useState(initialMeals);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentMeal, setCurrentMeal] = useState({});
  const [editedMeal, setEditedMeal] = useState('');

  const openEditModal = (day, type, meal) => {
    setCurrentMeal({ day, type, meal });
    setEditedMeal(meal);
    setModalVisible(true);
  };

  const handleEditMeal = () => {
    const updatedMeals = meals.map(meal => {
      if (meal.day === currentMeal.day) {
        return { ...meal, meals: { ...meal.meals, [currentMeal.type]: editedMeal } };
      }
      return meal;
    });
    setMeals(updatedMeals);
    setModalVisible(false);
  };

  const saveMealPlan = () => {
    alert('Meal plan saved!');
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
                onPress={() => openEditModal(item.day, mealType, item.meals[mealType])}
              >
                <Text style={styles.mealType}>{mealType}: </Text>
                <Text style={styles.meal}>{item.meals[mealType]}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.input}
              onChangeText={setEditedMeal}
              value={editedMeal}
              placeholder="Enter meal"
            />
            <Button title="Save Changes" onPress={handleEditMeal} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} color="#FF6347" />
          </View>
        </View>
      </Modal>
      <Button title="Save Meal Plan" onPress={saveMealPlan} />
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
    fontSize: 20, // Increase font size for better readability
    fontWeight: 'bold'
  },
  meal: {
    fontSize: 18, // Increase font size for better readability
  },
  mealItem: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  mealType: {
    fontWeight: 'bold',
    marginRight: 5,
    fontSize: 18, // Increase font size for better readability
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  input: {
    height: 40,
    marginBottom: 20,
    borderWidth: 1,
    padding: 10,
    width: 200,
    fontSize: 18, 
  },
});

export default MealPlanScreen;