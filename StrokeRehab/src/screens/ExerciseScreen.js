import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Button, Alert } from 'react-native';

// Initial data for exercises
const initialExercises = [
  { id: '1', title: 'Push-ups', description: 'Do 20 push-ups.', completed: false },
  { id: '2', title: 'Sit-ups', description: 'Do 30 sit-ups.', completed: false },
  { id: '3', title: 'Squats', description: 'Do 15 squats.', completed: false },
  { id: '4', title: 'Plank', description: 'Hold a plank for 60 seconds.', completed: false }
];

const ExerciseScreen = () => {
  const [exercises, setExercises] = useState(initialExercises);
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef(null);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const resetTimer = () => {
    stopTimer();
    setSeconds(0);
  };

  const toggleComplete = (id) => {
    const updatedExercises = exercises.map(exercise => {
      if (exercise.id === id) {
        return { ...exercise, completed: !exercise.completed };
      }
      return exercise;
    });
    setExercises(updatedExercises);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={exercises}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.itemContainer, item.completed ? styles.completed : null]}
            onPress={() => toggleComplete(item.id)}
          >
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>{`Timer: ${seconds} Seconds`}</Text>
        <Button title="Start" onPress={startTimer} />
        <Button title="Stop" onPress={stopTimer} />
        <Button title="Reset" onPress={resetTimer} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  itemContainer: {
    padding: 20,
    marginVertical: 5,
    backgroundColor: '#f0f0f0',
  },
  completed: {
    backgroundColor: '#a0e0a0', // Light green background for completed items
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
  },
  timerContainer: {
    padding: 20,
    alignItems: 'center',
  },
  timerText: {
    fontSize: 20,
    marginBottom: 10,
  },
});

export default ExerciseScreen;
