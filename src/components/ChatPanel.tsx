import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useChat } from '../hooks/useChat';
import { sendMessage } from '../lib/chat';
import { askNotificationPermission } from '../lib/notifications';

type Props = {
  eventId: number;
  eventTitle: string;
};

export default function ChatPanel({ eventId, eventTitle }: Props) {
  const { messages, status } = useChat(eventId, eventTitle);
  const [text, setText] = useState('');

  const canSend = text.trim().length > 0;
  
  useEffect(() => {
      askNotificationPermission();
    }, []);

  function handleSend() {
    if (!canSend) return;
    sendMessage(eventId, text.trim());
    setText('');
  }

  const newestFirst = [...messages].reverse();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Live chat</Text>

      <TextInput
        style={styles.input}
        placeholder="Write a message"
        maxLength={200}
        value={text}
        onChangeText={setText}
      />

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Send"
        style={[styles.button, !canSend && styles.buttonDisabled]}
        onPress={handleSend}
        disabled={!canSend}
      >
        <Text style={styles.buttonText}>Send</Text>
      </Pressable>

      {status === 'connecting' && <Text>Connecting</Text>}
      {status === 'error' && <Text>Chat unavailable</Text>}
      {status === 'live' && messages.length === 0 && <Text>No messages yet</Text>}

      {newestFirst.map((m) => (
        <Text key={m.id} style={styles.message}>
          {m.author}: {m.text}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 16, gap: 8 },
  heading: { fontSize: 18, fontWeight: '600' },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  button: {
    minHeight: 44,
    borderRadius: 8,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: { opacity: 0.4 },
  buttonText: { color: '#fff', fontWeight: '600' },
  message: { paddingVertical: 2 },
});