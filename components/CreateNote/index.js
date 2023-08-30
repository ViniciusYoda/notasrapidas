import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CreateNote({ navigation }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSaveNote = async () => {
    if (title && content) {
      try {
        const storedNotes = await AsyncStorage.getItem('notes');
        const parsedNotes = storedNotes ? JSON.parse(storedNotes) : [];

        const newNote = { title, content };
        parsedNotes.push(newNote);

        await AsyncStorage.setItem('notes', JSON.stringify(parsedNotes));

        navigation.goBack();
      } catch (error) {
        console.error('Erro ao salvar nota:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Conteúdo"
        multiline
        value={content}
        onChangeText={setContent}
      />
      <Button title="Salvar" onPress={handleSaveNote} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});


