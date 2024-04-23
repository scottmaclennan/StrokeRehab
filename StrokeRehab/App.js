import { StatusBar } from 'expo-status-bar';
import * as Notifications from 'expo-notifications';
import { StyleSheet, Text, View } from 'react-native';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="AppointmentDetails" component={AppointmentDetailScreen} />
    </Stack.Navigator>
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
