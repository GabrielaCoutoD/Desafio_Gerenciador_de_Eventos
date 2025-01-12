import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Modal, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();
  const adminId = 1;
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState({ nome: '', data: '', localizacao: '', imagem: '', adminId });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`http://localhost:8088/evento/${adminId}`);
        setEvents(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchEvents();
  }, [adminId]);

  const handleAddEvent = async () => {
    try {
      const response = await axios.post('http://localhost:8088/evento', newEvent);
      setEvents([...events, response.data]);
      setShowModal(false);
      setNewEvent({ nome: '', data: '', localizacao: '', imagem: '', adminId });
    } catch (error) {
      Alert.alert('Erro', 'Erro ao adicionar evento. Por favor, tente novamente.');
    }
  };

  const handleDeleteEvent = async (eventoId) => {
    try {
      await axios.delete(`http://localhost:8088/evento/${eventoId}`);
      const updatedEvents = events.filter((event) => event.id !== eventoId);
      setEvents(updatedEvents);
    } catch (error) {
      Alert.alert('Erro', 'Erro ao excluir evento. Por favor, tente novamente.');
    }
  };

  const handleInputChange = (name, value) => {
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  if (loading) return <Text>Carregando...</Text>;
  if (error) return <Text>Ocorreu um erro: {error.message}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eventos Cadastrados</Text>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.eventCard}>
            <Text style={styles.eventTitle}>{item.nome}</Text>
            <Text>{item.data} - {item.localizacao}</Text>
            <TouchableOpacity onPress={() => handleDeleteEvent(item.id)}>
              <Text style={styles.deleteButton}>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <View style={styles.centeredButtonContainer}>
        <TouchableOpacity onPress={() => setShowModal(true)} style={styles.centeredButton}>
          <Text style={styles.buttonText}>Adicionar Evento</Text>
        </TouchableOpacity>
      </View>
      {showModal && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={showModal}
          onRequestClose={() => setShowModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Adicionar Novo Evento</Text>
              <TextInput
                style={styles.input}
                placeholder="Nome do Evento"
                value={newEvent.nome}
                onChangeText={(value) => handleInputChange('nome', value)}
              />
              <TextInput
                style={styles.input}
                placeholder="Data"
                value={newEvent.data}
                onChangeText={(value) => handleInputChange('data', value)}
              />
              <TextInput
                style={styles.input}
                placeholder="Localização"
                value={newEvent.localizacao}
                onChangeText={(value) => handleInputChange('localizacao', value)}
              />
              <TextInput
                style={styles.input}
                placeholder="URL da Imagem"
                value={newEvent.imagem}
                onChangeText={(value) => handleInputChange('imagem', value)}
              />
              <Button title="Salvar" onPress={handleAddEvent} />
              <Button title="Cancelar" onPress={() => setShowModal(false)} />
            </View>
          </View>
        </Modal>
      )}
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  eventCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 5,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  eventTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  deleteButton: {
    color: 'red',
    marginTop: 10,
  },
  centeredButtonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  centeredButton: {
    padding: 15,
    backgroundColor: 'rgb(14, 59, 90)',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 5,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
    padding: 10,
    fontSize: 16,
  },
});

export default Home;
