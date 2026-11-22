import { Pressable, StyleSheet, Text } from 'react-native';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Animated, { FadeIn, FadeOut, LinearTransition, ZoomIn } from 'react-native-reanimated';
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
  },
  action: {
    backgroundColor: 'steelblue',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 80,
    minHeight: 44,
    margin: 5,
    borderRadius: 10,
  },
  actionText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

type EventsRowProps = {
  event: CampusEvent;
  onPress: () => void;
  onToggleSaved: () => void;
  Saved: boolean;
};

export default function EventRow({ event, onPress, onToggleSaved, Saved }: EventsRowProps) {
  return (
    <Animated.View entering={FadeIn} exiting={FadeOut} layout={LinearTransition}>
    <Swipeable
      friction={2}
      rightThreshold={60}
      renderRightActions={(_progress, _translation, swipeable) => (
        <Pressable
          onPress={() => {
            onToggleSaved();
            swipeable.close();
          }}
          style={styles.action}
        >
          <Text style={styles.actionText}>{Saved ? 'Unsave' : 'Save'}</Text>
        </Pressable>
      )}
    >
      <Pressable
        onPress={onPress}
        onLongPress={onToggleSaved}
        style={({ pressed }) => [styles.box, pressed && styles.boxPressed]}
      >
        <Text>{event.title}</Text>
        <Text>{event.date} · {event.place}</Text>
        {Saved && <Animated.Text entering={ZoomIn}>★ Saved</Animated.Text>}
      </Pressable>
    </Swipeable>
    </Animated.View>
  );
}
