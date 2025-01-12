import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import EventCard from '../../components/EventCard';
import Header from '../../components/Header';

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h2`
  color: #333;
  text-align: center;
  margin-bottom: 40px;
`;

const EventList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const Button = styled.button`
  padding: 15px 20px;
  margin-left: 10px;
  border: none;
  border-radius: 5px;
  background-color: rgb(14, 59, 90);
  color: white;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const CenteredButton = styled(Button)`
  margin-top: 30px;
  margin-left: 0;
  background-color: rgb(14, 59, 90);
  &:hover {
    background-color: rgb(14, 59, 90);
  }
`;

const CenteredButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const Home = () => {
  const navigate = useNavigate();
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
      setError('Erro ao adicionar evento. Por favor, tente novamente.');
    }
  };

  const handleDeleteEvent = async (eventoId) => {
    try {
      await axios.delete(`http://localhost:8088/evento/${eventoId}`);
      const updatedEvents = events.filter((event) => event.id !== eventoId);
      setEvents(updatedEvents);
    } catch (error) {
      setError('Erro ao excluir evento. Por favor, tente novamente.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleLogout = () => {
    navigate('/login');
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Ocorreu um erro: {error.message}</p>;

  return (
    <Container>
      <Header />
      <Title>Eventos Cadastrados</Title>
      <EventList>
        {events.map((event) => (
          <EventCard key={event.id} event={event} onDelete={() => handleDeleteEvent(event.id)} />
        ))}
      </EventList>
      <CenteredButtonContainer>
        <CenteredButton onClick={() => setShowModal(true)}>Adicionar Evento</CenteredButton>
      </CenteredButtonContainer>
      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <h2>Adicionar Novo Evento</h2>
            <Input
              type="text"
              name="nome"
              placeholder="Nome do Evento"
              value={newEvent.nome}
              onChange={handleInputChange}
            />
            <Input
              type="date"
              name="data"
              placeholder="Data"
              value={newEvent.data}
              onChange={handleInputChange}
            />
            <Input
              type="text"
              name="localizacao"
              placeholder="Localização"
              value={newEvent.localizacao}
              onChange={handleInputChange}
            />
            <Input
              type="text"
              name="imagem"
              placeholder="URL da Imagem"
              value={newEvent.imagem}
              onChange={handleInputChange}
            />
            <Button onClick={handleAddEvent}>Salvar</Button>
            <Button onClick={() => setShowModal(false)}>Cancelar</Button>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default Home;
