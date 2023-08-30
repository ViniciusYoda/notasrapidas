import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({ navigation }) {
  const [notes, setNotes] = useState([]);

useEffect(() => {
  const unsubscribe = navigation.addListener('focus', () => {
    loadNotes();
  });

  return unsubscribe;
}, [navigation]);

  const loadNotes = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem('notes');
      if (storedNotes !== null) {
        setNotes(JSON.parse(storedNotes));
      }
    } catch (error) {
      console.error('Erro ao carregar notas:', error);
    }
  };

  const handleEditNote = (note) => {
    navigation.navigate('EditNote', { note });
  };

  async function handleDeleteNote (note) {
    try {
      const storedNotes = await AsyncStorage.getItem('notes');
      if (storedNotes !== null) {
        const parsedNotes = JSON.parse(storedNotes);

        const updatedNotes = parsedNotes.filter(item => item.title !== note.title && item.content !== note.content);

        await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));

        setNotes(updatedNotes);
      }
    } catch (error) {
      console.error('Erro ao excluir nota:', error);
    }
  };

const renderItem = ({ item }) => (
  <View style={styles.noteItem}>
    <TouchableOpacity
      style={styles.noteContent}
      onPress={() => navigation.navigate('ViewNote', { title: item.title, content: item.content })}
    >
      <Text style={styles.noteTitle}>{item.title}</Text>
      <Text style={styles.notePreview}>{item.content.substring(0, 20)}...</Text>
    </TouchableOpacity>
    <View style={styles.actionsContainer}>
      <TouchableOpacity onPress={() => handleEditNote(item)}>
        <Feather name="edit-2" size={20} color="#007bff" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDeleteNote(item)}>
        <Feather name="trash" size={20} color="#ff4d4d" />
      </TouchableOpacity>
    </View>
  </View>
);


  return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('CreateNote')}
      >
        <Feather name="plus-circle" size={30} color="#007bff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  noteItem: {
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
  },
  noteContent: {
    flex: 1, 
    marginRight: 10, 
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  notePreview: {
    fontSize: 14,
  },
  actionsContainer: {
    flexDirection: 'row', 

  },
});

