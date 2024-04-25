import React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/Images/StrokeRehab.jpeg')} resizeMode="cover" 
      style={styles.image} >
      <Text style={styles.title}>Welcome to </Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Food Planner"
          onPress={() => navigation.navigate('FoodPlanner')}
        />
        <Button
          title="Medical Tracker"
          onPress={() => navigation.navigate('MedicalPlanner')}
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
    justifyContent: 'center',
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'Center',
    alignItems:'center',
    paddingHorizontal: 20,
  }
});

export default HomeScreen;