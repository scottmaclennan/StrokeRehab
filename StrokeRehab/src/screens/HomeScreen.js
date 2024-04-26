import React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground 
        source={require('../assets/Images/StrokeRehab.jpeg')}
        style={styles.image}
      >
      <Text style={styles.title}>Welcome to StrokeRehab</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Food Planner"
          onPress={() => navigation.navigate('FoodPlanner')}
        />
        <Button
          title="Medical Tracker"
          onPress={() => navigation.navigate('MedicationPlanner')}
        />
        <Button
          title="Exercise Planner"
          onPress={() => navigation.navigate('ExercisePlanner')}
        />
      </View>
      </ImageBackground>
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
  image: {
    flex: 1,
    resizeMode: 'cover', 
    justifyContent: 'center', 
    width: '100%', 
    height: '100%' 
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'center', 
    alignItems: 'center',
    paddingHorizontal: 20,
  }
});

export default HomeScreen;