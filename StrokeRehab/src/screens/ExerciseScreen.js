import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';

// Initial set of exercises
const initialExercises = [
  { id: '1', title: 'Push-ups', description: 'Do 20 push-ups from the wall', seconds: 0, timerOn: false, intervalId: null },
  { id: '2', title: 'Fast walking', description: 'Fast walk for 15 mins', seconds: 0, timerOn: false, intervalId: null },
];

// Main component for the Exercise screen
const ExerciseScreen = () => {
  // State for managing exercises
  const [exercises, setExercises] = useState(initialExercises);
  // State for handling new exercise title input
  const [newTitle, setNewTitle] = useState('');
  // State for handling new exercise description input
  const [newDescription, setNewDescription] = useState('');

  // Effect hook for fetching exercises and scheduling reminders on component mount
  useEffect(() => {
    fetchExercises();
    scheduleDailyReminder();
  }, []);
  
  // Function to fetch exercises from a local server
  const fetchExercises = async () => {
    try {
      const response = await fetch('http://localhost:3000/exercises');
      const data = await response.json();
      setExercises(data);
    } catch (error) {
      console.error('Failed to fetch exercises:', error);
      Alert.alert('Error', 'Failed to fetch exercises from server');
    }
  };

  // Function to schedule daily reminders using expo-notifications
  const scheduleDailyReminder = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Daily Exercise Reminder',
        body: 'Don’t forget to complete your daily exercises!',
      },
      trigger: {
        hour: 8,
        minute: 0,
        repeats: true,
      },
    });
  };

  // Function to add a new exercise
  const addExercise = () => {
    if (newTitle && newDescription) {
      const newId = (Math.max(...exercises.map(ex => parseInt(ex.id, 10))) + 1).toString();
      const newExercise = { id: newId, title: newTitle, description: newDescription, seconds: 0, timerOn: false, intervalId: null };
      setExercises([...exercises, newExercise]);
      setNewTitle('');
      setNewDescription('');
    } else {
      Alert.alert('Error', 'Both title and description must be filled out.');
    }
  };

  // Function to handle timer commands for exercises
  const handleTimer = (id, command) => {
    setExercises(exs => exs.map(ex => {
      if (ex.id === id) {
        switch (command) {
          case 'start':
            const intervalId = setInterval(() => {
              setExercises(currentExs => currentExs.map(innerEx => {
                if (innerEx.id === id) {
                  return { ...innerEx, seconds: innerEx.seconds + 1 };
                }
                return innerEx;
              }));
            }, 1000);
            return { ...ex, timerOn: true, intervalId };
          case 'stop':
            clearInterval(ex.intervalId);
            return { ...ex, timerOn: false, intervalId: null };
          case 'reset':
            clearInterval(ex.intervalId);
            return { ...ex, seconds: 0, timerOn: false, intervalId: null };
          default:
            return ex;
        }
      }
      return ex;
    }));
  };

  // Rendering each exercise item in a list
  const renderExerciseItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.timerText}>Timer: {item.seconds} Seconds</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={item.timerOn ? styles.buttonStop : styles.buttonStart} onPress={() => handleTimer(item.id, item.timerOn ? 'stop' : 'start')}>
          <Text style={styles.buttonText}>{item.timerOn ? 'Stop' : 'Start'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonReset} onPress={() => handleTimer(item.id, 'reset')}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Main component return
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setNewTitle}
        value={newTitle}
        placeholder="New Exercise Title"
      />
      <TextInput
        style={styles.input}
        onChangeText={setNewDescription}
        value={newDescription}
        placeholder="New Exercise Description"
      />
      <TouchableOpacity style={styles.addButton} onPress={addExercise}>
        <Text style={styles.buttonText}>Add Exercise</Text>
      </TouchableOpacity>
      <FlatList
        data={exercises}
        keyExtractor={item => item.id}
        renderItem={renderExerciseItem}
      />
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
  },
  itemContainer: {
    padding: 20,
    marginVertical: 8,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 4,
  },
  input: {
    height: 50,
    borderColor: '#cccccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    fontSize: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 18,
  },
  timerText: {
    fontSize: 18,
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonStart: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#4CAF50',
  },
  buttonStop: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f44336',
  },
  buttonReset: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#ffeb3b',
  },
  addButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#2196f3',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ExerciseScreen;
