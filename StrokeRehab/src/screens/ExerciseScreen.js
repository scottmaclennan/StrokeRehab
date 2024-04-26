import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Button, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';

const initialExercises = [
  { id: '1', title: 'Push-ups', description: 'Do 20 push-ups from the wall', seconds: 0, timerOn: false, intervalId: null },
  { id: '2', title: 'Fast walking', description: 'Fast walk for 15 mins', seconds: 0, timerOn: false, intervalId: null },
];

const ExerciseScreen = () => {
  const [exercises, setExercises] = useState(initialExercises);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');

  useEffect(() => {
    scheduleDailyReminder(); // Schedule daily exercise reminder when component mounts
  }, []);

  const scheduleDailyReminder = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Daily Exercise Reminder',
        body: 'Don\'t forget to complete your daily exercises!',
      },
      trigger: {
        hour: 8, // Set the reminder to 8:00 AM
        minute: 0,
        repeats: true,
      },
    });
  };

  const addExercise = () => {
    if (newTitle && newDescription) {
      const newId = (Math.max(...exercises.map(ex => parseInt(ex.id))) + 1).toString(); // Ensure unique ID
      const newExercise = { id: newId, title: newTitle, description: newDescription, seconds: 0, timerOn: false, intervalId: null };
      setExercises([...exercises, newExercise]);
      setNewTitle('');
      setNewDescription('');
    } else {
      Alert.alert('Error', 'Both title and description must be filled out.');
    }
  };

  const startTimer = (id) => {
    setExercises(exs => exs.map(ex => {
      if (ex.id === id && !ex.timerOn) {
        const intervalId = setInterval(() => {
          setExercises(currentExs => currentExs.map(innerEx => {
            if (innerEx.id === id) {
              return { ...innerEx, seconds: innerEx.seconds + 1 };
            }
            return innerEx;
          }));
        }, 1000);
        return { ...ex, timerOn: true, intervalId };
      }
      return ex;
    }));
  };

  const stopTimer = (id) => {
    setExercises(exs => exs.map(ex => {
      if (ex.id === id && ex.timerOn) {
        clearInterval(ex.intervalId);
        return { ...ex, timerOn: false, intervalId: null };
      }
      return ex;
    }));
  };

  const resetTimer = (id) => {
    stopTimer(id);
    setExercises(exs => exs.map(ex => {
      if (ex.id === id) {
        return { ...ex, seconds: 0 };
      }
      return ex;
    }));
  };

  const renderExerciseItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.timerText}>Timer: {item.seconds} Seconds</Text>
      <View style={styles.buttonContainer}>
        {!item.timerOn && <Button title="Start" onPress={() => startTimer(item.id)} />}
        {item.timerOn && <Button title="Stop" onPress={() => stopTimer(item.id)} />}
        <Button title="Reset" onPress={() => resetTimer(item.id)} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Input fields for adding new exercises */}
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
      <Button title="Add Exercise" onPress={addExercise} />

      {/* List of exercises */}
      <FlatList
        data={exercises}
        keyExtractor={item => item.id}
        renderItem={renderExerciseItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  itemContainer: {
    padding: 20,
    marginVertical: 5,
    backgroundColor: '#f0f0f0',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    fontSize: 16, // Increase font size for better readability
  },
  title: {
    fontSize: 20, // Increase font size for better readability
    fontWeight: 'bold',
  },
  description: {
    fontSize: 18, // Increase font size for better readability
  },
  timerText: {
    fontSize: 18, // Increase font size for better readability
    marginVertical: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default ExerciseScreen;
