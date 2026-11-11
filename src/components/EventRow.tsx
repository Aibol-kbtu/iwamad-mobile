import { Pressable, StyleSheet ,Text } from 'react-native';
import { type CampusEvent } from '../data/events';

const styles = StyleSheet.create({
  box: {
    backgroundColor: 'lightgray',
    padding: 10,
    margin: 5,
    minHeight: 44,
    borderRadius: 10,
  },
  boxPressed: {
    backgroundColor: 'gray',
  }
});

type EventsRowProps = {
  event: CampusEvent;
  onPress: () => void;
  onLongPress: () => void;
  Saved: boolean;
};

export default function EventRow({ event, onPress, onLongPress, Saved }: EventsRowProps) {
  return (
    <Pressable 
        onPress={onPress} 
        onLongPress={onLongPress} 
        style={({ pressed }) => [styles.box, pressed && styles.boxPressed]}>
      <Text>{event.title}</Text>
      <Text>{event.date} · {event.place}</Text>
      {Saved && <Text>★ Saved</Text>}
    </Pressable>
  );
}
