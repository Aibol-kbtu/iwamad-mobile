import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';


export default function App() {
  const [likes, setLikes] = useState(0)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello, World!</Text>
      <Text style={styles.title}>Oralbekuly Aibol</Text>
      <Text style={styles.badword}>Likes: {likes}</Text>
      <Pressable style={styles.button} onPress={() => setLikes(likes + 1)}><Text style={styles.word}>Like</Text></Pressable>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  title: {
    fontSize: 32,
  },
  button: {
    minHeight: 44,
    paddingHorizontal: 50,
    backgroundColor: '#1a1c24',
    borderRadius: 70,
    marginTop: 20,
    justifyContent: 'center',
  },
  word: {
    color: '#cff149',
  },
  badword: {
    fontSize: 25,
    color: '#c9812a',
  }
});