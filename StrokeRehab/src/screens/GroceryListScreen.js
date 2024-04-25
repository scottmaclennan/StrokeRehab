import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';

const GroceryListScreen = () => {
  const [items, setItems] = useState([]);
  const [text, setText] = useState('');

  const addItem = () => {
    if (text) {
      setItems(prevItems => [...prevItems, { id: Date.now().toString(), text }]);
      setText('');
    }
  };

  const removeItem = id => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Add an item..."
        value={text}
        onChangeText={setText}
      />
      <Button title="Add Item" onPress={addItem} />
      <FlatList
        data={items}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.listItem} onPress={() => removeItem(item.id)}>
            <Text style={styles.itemText}>{item.text}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  listItem: {
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  itemText: {
    fontSize: 18,
  },
});

export default GroceryListScreen;
