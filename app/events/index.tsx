import {FlatList, Text, TextInput, View} from 'react-native';
import { events } from '../../src/data/events';
import EventRow from '../../src/components/EventRow';
import { useRouter } from 'expo-router';
import { useState } from 'react'

export default function EventsScreen() {
    const router = useRouter();
    const [query, setQuery] = useState('');
    const [savedIds, setSavedEvents] = useState<number[]>([]);
    const toggleSavedEvent = (eventId: number) => {
        if (savedIds.includes(eventId)) {
            setSavedEvents(savedIds.filter(id => id !== eventId));
        } else {
            setSavedEvents([...savedIds, eventId]);
        }
    };
    const shown = events.filter((e) =>
        e.title.toLowerCase().includes(query.toLowerCase())
    );
    return (
        <View style={{ flex: 1, paddingTop: 50 }}>
        <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search events"
        />    
        <FlatList
            data={shown}
            extraData={savedIds}
            ListHeaderComponent={<Text style={{ fontSize: 24, fontWeight: 'bold', margin: 10 }}>Long-press an event to save it. Saved: {savedIds.length}</Text>}
            ListEmptyComponent={<Text style={{ fontSize: 24, fontWeight: 'bold', margin: 10 }}>No events match</Text>}
            renderItem={({ item }) => <EventRow event={item} onPress={() => router.push(`/events/${item.id}`)} onLongPress={() => toggleSavedEvent(item.id)} Saved={savedIds.includes(item.id)} />}
            keyExtractor={item => item.id.toString()}
        />
        </View>
    );
}
