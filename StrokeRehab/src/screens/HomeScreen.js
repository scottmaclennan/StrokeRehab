import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { Calendar } from 'react-native-calendars';

const HomeScreen = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState('');

  return (
    <View style={{ flex: 1 }}>
      <Calendar
        onDayPress={(day) => {
          setSelectedDate(day.dateString);
          navigation.navigate('AppointmentDetails', { date: day.dateString });
        }}
      />
      <Text>Selected Date: {selectedDate}</Text>
    </View>
  );
};

export default HomeScreen;