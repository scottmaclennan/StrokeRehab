import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

function MedicationScreen() {
  return (
    <View style={styles.container}>
      <Text>Medication Reminder</Text>
      <Button title="Add Medication" onPress={() => {/* Logic to add medication */}} />
      // Optionally list medications here
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default MedicationScreen;