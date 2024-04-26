import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, KeyboardAvoidingView, TouchableOpacity, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

// Static list of days of the week for selection in the UI
const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// Set up default handling for incoming notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Main functional component for managing medication schedules
export default function MedicationScreen() {
  // State for managing list of medications
  const [medications, setMedications] = useState([]);
  // State for the new medication name input
  const [newMedication, setNewMedication] = useState('');
  // State for the new medication dosage time input
  const [doseTime, setDoseTime] = useState('');
  // State for the new medication dosage quantity input
  const [doseQuantity, setDoseQuantity] = useState('');
  // State for tracking selected days of the week
  const [selectedDays, setSelectedDays] = useState([]);

  // Effect hook to register for push notifications on component mount
  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  // Toggles the selection of a day when setting up medication reminders
  const toggleDay = (day) => {
    setSelectedDays(prev => prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]);
  };

  // Adds a new medication entry to the list
  const addMedication = async () => {
    if (!newMedication || !doseTime || !doseQuantity || selectedDays.length === 0) {
      Alert.alert('Error', 'All fields must be filled out and at least one day must be selected.');
      return;
    }
  
    const newEntry = {
      name: newMedication,
      doses: [{ time: doseTime, quantity: doseQuantity }],
      days: selectedDays
    };
  
    try {
      const response = await fetch('http://localhost:3000/medications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newEntry)
      });
  
      const jsonResponse = await response.json();
      alert(jsonResponse.message);
  
      if (response.status === 200) {
        setMedications([...medications, newEntry]);
        setNewMedication('');
        setDoseTime('');
        setDoseQuantity('');
        setSelectedDays([]);
      }
  
    } catch (error) {
      console.error('Failed to save the medication:', error);
      Alert.alert('Error', 'Failed to save the medication');
    }
  };

  // Registers the device for push notifications
  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    return token;
  }

  // Main component rendering
  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Medication name"
            style={styles.input}
            value={newMedication}
            onChangeText={setNewMedication}
          />
          <TextInput
            placeholder="Time (e.g., 8:00 AM)"
            style={styles.input}
            value={doseTime}
            onChangeText={setDoseTime}
          />
          <TextInput
            placeholder="Quantity (e.g., 2 pills)"
            style={styles.input}
            keyboardType="numeric"
            value={doseQuantity}
            onChangeText={setDoseQuantity}
          />
          <View style={styles.daysContainer}>
            {daysOfWeek.map((day, index) => (
              <TouchableOpacity
                key={index}
                style={selectedDays.includes(day) ? styles.dayButtonSelected : styles.dayButton}
                onPress={() => toggleDay(day)}
              >
                <Text style={styles.dayText}>{day.substring(0, 3)}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Button title="Add Medication" onPress={addMedication} />
        </View>
        {medications.map((med, index) => (
          <View key={index} style={styles.listItem}>
            <Text style={styles.medText}>{med.name}</Text>
            {med.doses.map((dose, idx) => (
              <Text key={idx} style={styles.doseText}>{dose.quantity} at {dose.time}</Text>
            ))}
            <Text style={styles.daysText}>Days: {med.days.join(', ')}</Text>
          </View>
        ))}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// Styles for the MedicationScreen component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f8',
  },
  scrollView: {
    width: '100%',
  },
  inputContainer: {
    padding: 20,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  listItem: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 20,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
  },
  medText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  doseText: {
    fontSize: 16,
  },
  daysText: {
    fontSize: 16,
    color: '#666',
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  dayButton: {
    padding: 10,
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
  },
  dayButtonSelected: {
    padding: 10,
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
    borderWidth: 1,
    borderRadius: 20,
  },
  dayText: {
    color: '#333',
  }
});