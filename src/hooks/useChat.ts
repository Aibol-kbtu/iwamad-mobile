import { useEffect, useState, useRef } from 'react';
import { ChatMessage, subscribeToChat, DEVICE_ID } from '../lib/chat';
import { notifyNewMessage } from '../lib/notifications';

type ChatStatus = 'connecting' | 'live' | 'error';

export function useChat(eventId: number, eventTitle: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [status, setStatus] = useState<ChatStatus>('connecting');

  const seenIds = useRef<Set<ChatMessage['id']> | null>(null);

  useEffect(() => {
    seenIds.current = null;

    const unsubscribe = subscribeToChat(
      eventId,
      (list) => {
        setStatus('live');

        if (seenIds.current === null) {
          seenIds.current = new Set(list.map((m) => m.id));
        } else {
          for (const message of list) {
            if (!seenIds.current.has(message.id)) {
              seenIds.current.add(message.id);

              if (message.deviceId !== DEVICE_ID) {
                notifyNewMessage(eventTitle, message);
              }
            }
          }
        }
        setMessages(list);
      },
      () => setStatus('error'),
    );

    return unsubscribe;
  }, [eventId, eventTitle]);

  return { messages, status };
}
