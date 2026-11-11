import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useEvents } from '../../src/hooks/useEvents';

export default function EventScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isPending, isError, error, refetch } = useEvents();

  if (isPending) {
    return (
      <View>
        <ActivityIndicator />
        <Text>Loading events.</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View>
        <Text>Could not load events</Text>
        <Text>{error.message}</Text>
        <Pressable onPress={() => refetch()} style={{ minHeight: 44 }}>
          <Text>Try again</Text>
        </Pressable>
      </View>
    );
  }

  const event = data.find((e) => e.id === Number(id));

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