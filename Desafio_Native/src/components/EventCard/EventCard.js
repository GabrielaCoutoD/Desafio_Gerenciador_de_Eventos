import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const EventCard = ({ event, onDelete }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: '/assets/event2.jpg' }} style={styles.eventImage} />
      <View style={styles.eventInfo}>
        <Text style={styles.eventTitle}>{event.nome}</Text>
        <Text style={styles.eventDate}>Data: {event.data}</Text>
        <Text style={styles.eventLocation}>Localização: {event.localizacao}</Text>
        <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
          <Text style={styles.deleteButtonText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    margin: 10,
    padding: 15,
    width: 300,
    textAlign: 'center',
    backgroundColor: '#fff',
  },
  eventImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  eventInfo: {
    padding: 15,
  },
  eventTitle: {
    margin: 0,
    color: '#333',
    fontSize: 20,
    fontWeight: 'bold',
  },
  eventDate: {
    marginVertical: 5,
    color: '#666',
  },
  eventLocation: {
    marginVertical: 5,
    color: '#666',
  },
  deleteButton: {
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    backgroundColor: '#ff4d4d',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default EventCard;
