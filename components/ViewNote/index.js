import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ViewNote({ route }) {
  const { title, content } = route.params;
  const [noteData, setNoteData] = useState({ title: '', content: '' });

  useEffect(() => {
    loadNoteData();
  }, []);

  const loadNoteData = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem('notes');
      if (storedNotes !== null) {
        const notes = JSON.parse(storedNotes);
        const foundNote = notes.find(note => note.title === title && note.content === content);

        if (foundNote) {
          setNoteData(foundNote);
        }
      }
    } catch (error) {
      console.error('Erro ao carregar dados da nota:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{noteData.title}</Text>
      <Text style={styles.content}>{noteData.content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
  },
});

