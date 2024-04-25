import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, FlatList, Text } from 'react-native';
import { Button, TextInput, List } from 'react-native-paper';

const SymptomDairyScreen = () => {
    const [symptoms, setSymptoms] = useState([]);
    const [symptomName, setSymptomName] = useState('');
    const [description, setDescription] = useState('');
  
    const addSymptom = () => {
      if (symptomName && description) {
        const newSymptom = { id: Date.now().toString(), name: symptomName, details: description };
        setSymptoms([...symptoms, newSymptom]);
        setSymptomName('');
        setDescription('');
      }
    };
  
    return (
      <ScrollView style={styles.container}>
        <TextInput
          label="Symptom Name"
          value={symptomName}
          onChangeText={setSymptomName}
          mode="outlined"
          style={styles.input}
        />
        <TextInput
          label="Description"
          value={description}
          onChangeText={setDescription}
          mode="outlined"
          style={styles.input}
          multiline
          numberOfLines={3}
        />
        <Button mode="contained" onPress={addSymptom} style={styles.button}>
          Add Symptom
        </Button>
        <FlatList
          data={symptoms}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <List.Item
              title={item.name}
              description={item.details}
              left={props => <List.Icon {...props} icon="alert-circle" />}
            />
          )}
        />
      </ScrollView>
    );
  };
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginBottom: 20,
  },
});

export default SymptomDairyScreen;