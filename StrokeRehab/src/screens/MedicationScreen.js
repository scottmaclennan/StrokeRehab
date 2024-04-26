import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, KeyboardAvoidingView, TouchableOpacity, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function MedicationScreen() {
  const [medications, setMedications] = useState([]);
  const [newMedication, setNewMedication] = useState('');
  const [doseTime, setDoseTime] = useState('');
  const [doseQuantity, setDoseQuantity] = useState('');
  const [selectedDays, setSelectedDays] = useState([]);

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  const toggleDay = (day) => {
    setSelectedDays(prev => prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]);
  };

  const addMedication = () => {
    const newEntry = {
      name: newMedication,
      doses: [{ time: doseTime, quantity: doseQuantity }],
      days: selectedDays
    };
    setMedications([...medications, newEntry]);
    scheduleNotification(newEntry);  // Schedule a notification
    setNewMedication('');
    setDoseTime('');
    setDoseQuantity('');
    setSelectedDays([]);
  };

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

  async function scheduleNotification(medication) {
    for (let dose of medication.doses) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: `Time to take your medication: ${medication.name}`,
          body: `Take ${dose.quantity} at ${dose.time}`,
          data: { data: 'goes here' },
        },
        trigger: {
          hour: parseInt(dose.time.split(':')[0]),
          minute: parseInt(dose.time.split(':')[1]),
          repeats: true
        },
      });
    }
  }

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