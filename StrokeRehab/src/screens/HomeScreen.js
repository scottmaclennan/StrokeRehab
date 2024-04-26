import React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground, Platform, TouchableOpacity } from 'react-native';

// Defines the HomeScreen component which acts as the main entry screen of the app
const HomeScreen = ({ navigation }) => {
  return (
    // Container for the entire screen
    <View style={styles.container}>
      {/* Background image for the home screen */}
      <ImageBackground 
        source={require('../assets/Images/StrokeRehab.jpeg')}
        style={styles.image}
        accessible={true}
        accessibilityLabel="Background image for Stroke Rehab app home screen"
      >
        {/* Title text welcoming users to the app */}
        <Text style={styles.title} accessible={true} accessibilityRole="header">
          Welcome to StrokeRehab
        </Text>
        {/* Container for navigation buttons */}
        <View style={styles.buttonContainer}>
          {/* Navigation button to the Food Planner screen */}
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('FoodPlanner')}>
            <Text style={styles.buttonText}>Food Planner</Text>
          </TouchableOpacity>
          {/* Navigation button to the Medication Planner screen */}
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MedicationPlanner')}>
            <Text style={styles.buttonText}>Medical Tracker</Text>
          </TouchableOpacity>
          {/* Navigation button to the Exercise Planner screen */}
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ExercisePlanner')}>
            <Text style={styles.buttonText}>Exercise Planner</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

// StyleSheet to style the components in the HomeScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',  // Ensures contrast with the background
    marginBottom: 30,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',  // Shadow for text for better readability
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },  
  image: {
    flex: 1,
    resizeMode: 'cover',  // Ensures the image covers the full view
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'space-around',  // Distributes buttons evenly
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#4CAF50',  // Green background for visibility
    padding: 15,
    borderRadius: 20,
    width: '80%',  // Consistent width for aesthetic coherence
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  }
});

export default HomeScreen;