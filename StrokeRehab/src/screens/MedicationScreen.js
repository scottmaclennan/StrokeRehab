import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import DatePicker from 'react-native-datepicker';

const MedicationScreen = () => {
  const [medication, setMedication] = useState('');
  const [dose, setDose] = useState('');
  const [date, setDate] = useState(new Date());

  const handleSubmit = () => {
    // You would typically handle the data submission here,
    // possibly sending it to a backend server or storing it locally.
    console.log(`Medication: ${medication}, Dose: ${dose}, Date: ${date}`);
    alert('Reminder set!');
  };

  return (
    <View style={styles.container}>
      <Text>Add Your Medication</Text>
      <TextInput
        style={styles.input}
        placeholder="Medication Name"
        value={medication}
        onChangeText={setMedication}
      />
      <TextInput
        style={styles.input}
        placeholder="Dosage"
        value={dose}
        onChangeText={setDose}
      />
      <DatePicker
        style={styles.datePicker}
        date={date}
        mode="datetime"
        placeholder="select date and time"
        format="YYYY-MM-DD HH:mm"
        minDate={new Date()}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            display: 'none',
          },
          dateInput: {
            marginLeft: 36
          }
        }}
        onDateChange={setDate}
      />
      <Button title="Set Reminder" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    width: 200,
    height: 40,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'white'
  },
  datePicker: {
    width: 200,
    marginBottom: 20
  }
});

export default MedicationScreen;