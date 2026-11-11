import {FlatList,Text,TextInput,View,ActivityIndicator,Pressable,} from 'react-native';
import EventRow from '../../src/components/EventRow';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useEvents } from '../../src/hooks/useEvents';

export default function EventsScreen() {
    const {data,isPending,isError,error,refetch,isRefetching} = useEvents();
    const router = useRouter();
    const [query, setQuery] = useState('');
    const [savedIds, setSavedEvents] = useState<number[]>([]);

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
                <Pressable
                    onPress={() => refetch()}
                    style={{ minHeight: 44 }}>

                    <Text>Try again</Text>
                </Pressable>
            </View>
        );
    }
    const toggleSavedEvent = (eventId: number) => {
        if (savedIds.includes(eventId)) {
            setSavedEvents(savedIds.filter(id => id !== eventId));
        } else {
            setSavedEvents([...savedIds, eventId]);
        }
    };

    const shown = data.filter((e) =>
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
                refreshing={isRefetching}
                onRefresh={() => refetch()}
                ListHeaderComponent={
                    <Text style={{ fontSize: 24, fontWeight: 'bold', margin: 10 }}>
                        Long-press an event to save it. Saved: {savedIds.length}
                    </Text>
                }
                ListEmptyComponent={
                    <Text style={{ fontSize: 24, fontWeight: 'bold', margin: 10 }}>
                        No events match
                    </Text>
                }
                renderItem={({ item }) => (
                    <EventRow
                        event={item}
                        onPress={() => router.push(`/events/${item.id}`)}
                        onLongPress={() => toggleSavedEvent(item.id)}
                        Saved={savedIds.includes(item.id)}
                    />
                )}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
}
