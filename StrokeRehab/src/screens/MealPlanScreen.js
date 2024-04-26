import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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


  const saveMealPlan = async () => {
    try {
      const response = await fetch('http://yourserver.com/saveMealPlan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(meals)
      });
      const jsonResponse = await response.json();
      alert(jsonResponse.status);
    } catch (error) {
      alert('Failed to save the meal plan');
      console.error('Error saving meal plan:', error);
    }
  };
  
  const loadMealPlan = async () => {
    try {
      const savedMeals = await AsyncStorage.getItem('meals');
      if (savedMeals !== null) {
        setMeals(JSON.parse(savedMeals));
      }
    } catch (error) {
      alert('Failed to load the meal plan');
      console.error('Error loading meal plan:', error);
    }
  };
  
  useEffect(() => {
    loadMealPlan();
    scheduleDailyReminder();
  }, []);
  


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
        onRequestClose={() => setModalVisible(false)}
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
    backgroundColor: '#f7f7f7',
  },
  itemContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0'
  },
  day: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  meal: {
    fontSize: 18,
    color: '#666',
  },
  mealItem: {
    flexDirection: 'row',
    paddingVertical: 10,
    backgroundColor: '#fff',
    marginBottom: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  mealType: {
    fontWeight: 'bold',
    marginRight: 5,
    fontSize: 18,
    color: '#333',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // semi-transparent background
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
    borderColor: '#ccc',
    padding: 10,
    width: 250,
    fontSize: 18,
    backgroundColor: '#fff',
  },
});

export default MealPlanScreen;