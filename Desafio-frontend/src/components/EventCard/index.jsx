import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: 10px;
  padding: 15px;
  width: 300px;
  text-align: center;
  background-color: #fff;
`;

const EventImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
`;

const EventInfo = styled.div`
  padding: 15px;
`;

const EventTitle = styled.h3`
  margin: 0;
  color: #333;
`;

const EventDate = styled.p`
  margin: 5px 0;
  color: #666;
`;

const EventLocation = styled.p`
  margin: 5px 0;
  color: #666;
`;

const DeleteButton = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  background-color: #ff4d4d;
  color: white;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #ff1a1a;
  }
`;

const EventCard = ({ event, onDelete }) => {
  return (
    <Card>
      <EventImage src="/assets/event2.jpg" alt="Exemplo" />

      <EventInfo>
        <EventTitle>{event.nome}</EventTitle>
        <EventDate>Data: {event.data}</EventDate>
        <EventLocation>Localização: {event.localizacao}</EventLocation>
        <DeleteButton onClick={onDelete}>Excluir</DeleteButton>
      </EventInfo>
    </Card>
  );
};

export default EventCard;
