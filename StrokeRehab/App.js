import { StatusBar } from 'expo-status-bar';
import * as Notifications from 'expo-notifications';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

async function scheduleNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Time to take your medicine",
      body: 'Take 1 tablet of XYZ',
    },
    trigger: {
      hour: 9,
      minute: 0,
      repeats: true
    },
  });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
