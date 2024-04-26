import React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground, Platform, TouchableOpacity } from 'react-native';

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
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('FoodPlanner')}>
            <Text style={styles.buttonText}>Food Planner</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MedicationPlanner')}>
            <Text style={styles.buttonText}>Medical Tracker</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ExercisePlanner')}>
            <Text style={styles.buttonText}>Exercise Planner</Text>
          </TouchableOpacity>
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
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',  // Changed for better contrast with the background
    marginBottom: 30,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
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
    justifyContent: 'space-around',  // Changed for better distribution
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#4CAF50',  // A pleasant green tone
    padding: 15,
    borderRadius: 20,
    width: '80%',  // Consistent width for all buttons
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