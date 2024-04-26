import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Button, Alert } from 'react-native';

// Initial data for exercises
const initialExercises = [
  { id: '1', title: 'Push-ups', description: 'Do 20 push-ups from the wall', seconds: 0, timerOn: false, intervalId: null },
  { id: '2', title: 'Fast walking', description: 'Fast walk for 15 mins', seconds: 0, timerOn: false, intervalId: null },
];

const ExerciseScreen = () => {
  const [exercises, setExercises] = useState(initialExercises);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');

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
      <Button title="Add Exercise" onPress={addExercise} />

      <FlatList
        data={exercises}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
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
        )}
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
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
  },
  timerText: {
    fontSize: 16,
    marginVertical: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default ExerciseScreen;