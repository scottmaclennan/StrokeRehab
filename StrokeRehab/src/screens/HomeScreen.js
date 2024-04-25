import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Stroke Rehab</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Food Planner"
          onPress={() => navigation.navigate('FoodPlanner')}
        />
        <Button
          title="Medical Tracker"
          onPress={() => navigation.navigate('MedicalTracker')}
        />
        <Button
          title="Exercise Planner"
          onPress={() => navigation.navigate('ExercisePlanner')}
        />
        <Button
          title="Quiting smoking"
          onPress={() => navigation.navigate('WebResources')}
        />
        <Button
          title="Quiting Drinking"
          onPress={() => navigation.navigate('WebResources')}
        />
        <Button
          title="Dealing with Stress"
          onPress={() => navigation.navigate('WebResources')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  }
});

export default HomeScreen;