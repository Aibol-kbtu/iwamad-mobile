import { Text, View } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { events } from '../../src/data/events';

export default function EventScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const event = events.find((e) => e.id === Number(id));

  if (!event) {
    return (
      <View>
        <Text>Event not found</Text>
        <Text>No event with id {id}.</Text>
      </View>
    );
  }

  return (
    <View>
      <Stack.Screen options={{ title: event.title }} />
      <Text>{event.title}</Text>
      <Text>{event.date}</Text>
      <Text>{event.place}</Text>
      <Text>{event.seats} seats available</Text>
    </View>
  );
}