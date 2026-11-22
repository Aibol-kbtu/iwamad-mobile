import AsyncStorage from '@react-native-async-storage/async-storage';

export const SAVED_KEY = 'saved-event-ids';

export async function loadSavedIds(): Promise<number[]> {
  const text = await AsyncStorage.getItem(SAVED_KEY);
  if (text === null) {
    return [];
  }
  try {
    const value: unknown = JSON.parse(text);
    return Array.isArray(value)
      ? value.filter((id): id is number => typeof id === 'number')
      : [];
  } catch {
    return [];
  }
}

export async function storeSavedIds(ids: number[]): Promise<void> {
  await AsyncStorage.setItem(SAVED_KEY, JSON.stringify(ids));
}
