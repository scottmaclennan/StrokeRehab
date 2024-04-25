import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const AppointmentDetailsScreen = ({ route, navigation }) => {
  const { appointmentId, appointmentTime, details } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Appointment Details</Text>
      <Text style={styles.detail}>ID: {appointmentId}</Text>
      <Text style={styles.detail}>Time: {appointmentTime}</Text>
      <Text style={styles.detail}>Details: {details}</Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  detail: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default AppointmentDetailsScreen;