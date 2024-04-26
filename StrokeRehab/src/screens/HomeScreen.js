import React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground, Platform } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground 
        source={require('../assets/Images/StrokeRehab.jpeg')}
        style={styles.image}
        accessible={true}
        accessibilityLabel="Background image for Stroke Rehab app home screen"
      >
        <Text style={styles.title} accessible={true} accessibilityRole="header">
          Welcome to StrokeRehab
        </Text>
        <View style={styles.buttonContainer}>
          <Button
            title="Food Planner"
            onPress={() => navigation.navigate('FoodPlanner')}
            accessibilityLabel="Navigate to the Food Planner"
          />
          <Button
            title="Medical Tracker"
            onPress={() => navigation.navigate('MedicationPlanner')}
            accessibilityLabel="Navigate to the Medical Tracker"
          />
          <Button
            title="Exercise Planner"
            onPress={() => navigation.navigate('ExercisePlanner')}
            accessibilityLabel="Navigate to the Exercise Planner"
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
    color: '#fff', // Assuming the background is dark, white text for better contrast
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    marginBottom: 20,
    textAlign: 'center'
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