import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditNote({ route, navigation }) {
  const { note } = route.params;
  const [editedTitle, setEditedTitle] = useState(note.title);
  const [editedContent, setEditedContent] = useState(note.content);

  async function handleUpdateNote(){
    try {
      const storedNotes = await AsyncStorage.getItem('notes');
      if (storedNotes !== null) {
        const parsedNotes = JSON.parse(storedNotes);

        const updatedNotes = parsedNotes.map(item => {
          if (item.title === note.title && item.content === note.content) {
            return { ...item, title: editedTitle, content: editedContent };
          }
          return item;
        });

        await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));

        navigation.navigate('ViewNote', { title: editedTitle, content: editedContent });
      }
    } catch (error) {
      console.error('Erro ao editar nota:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={editedTitle}
        onChangeText={setEditedTitle}
        placeholder="Título da Nota"
      />
      <TextInput
        style={[styles.input, styles.contentInput]}
        value={editedContent}
        onChangeText={setEditedContent}
        placeholder="Conteúdo da Nota"
        multiline
      />
      <Button title="Salvar" onPress={handleUpdateNote} />
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
  contentInput: {
    height: '100%', 
  },
});

