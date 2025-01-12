import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 400px;
  background-color: #ffffff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: #333;
  text-align: center;
`;

const Input = styled.input`
  margin-bottom: 15px;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 15px 20px;
  margin-top: 10px;
  border: none;
  border-radius: 5px;
  background-color: #28a745;
  color: white;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;

const SuccessMessage = styled.p`
  color: #28a745;
  font-size: 16px;
  text-align: center;
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
`;

const LoginLink = styled.button`
  background: none;
  border: none;
  color: #007bff;
  text-decoration: underline;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;

  &:hover {
    color: #0056b3;
  }
`;

const Cadastro = () => {
  const [adminName, setAdminName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8088/administradores', {
        nome: adminName,
        email,
        senha: password,
        eventos: [] 
      });
      
      if (response.status === 200) {
        setSuccess(true);
        setTimeout(() => navigate('/login'), 2000);
      }
    } catch (error) {
      setError('Erro ao fazer cadastro. Por favor, tente novamente.');
    }
  };

  const handleLoginLink = () => {
    navigate('/login');
  };

  return (
    <Container>
      <Form onSubmit={handleRegister}>
        <Title>Cadastro</Title>
        <Input
          type="text"
          placeholder="Nome do Administrador"
          value={adminName}
          onChange={(e) => setAdminName(e.target.value)}
          required
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Confirmar Senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button type="submit">Cadastrar-se</Button>
        {success && <SuccessMessage>Cadastro realizado com sucesso! Redirecionando para a tela de login...</SuccessMessage>}
        <LoginLink onClick={handleLoginLink}>Já tem uma conta? Volte ao Login</LoginLink>
      </Form>
    </Container>
  );
};

export default Cadastro;
