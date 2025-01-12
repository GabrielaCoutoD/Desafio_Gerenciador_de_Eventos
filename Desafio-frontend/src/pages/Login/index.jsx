import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import backgroundImg from '../../assets/fundo.jpg';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image: url(${backgroundImg});
  background-size: cover;
  background-position: center;
`;

const FormWrapper = styled.div`
  background-color: rgba(255, 255, 255, 0.9);
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 400px;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: #333;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  margin-bottom: 15px;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Checkbox = styled.input`
  margin-right: 10px;
`;

const Button = styled.button`
  width: 100%;
  padding: 15px 20px;
  margin-bottom: 10px;
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

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8088/administradores/login', {
        email,
        senha: password,
      });
      if (response.status === 200) {
        
        navigate('/home');
      } else {
        setError('Credenciais inválidas. Por favor, tente novamente.');
      }
    } catch (error) {
      setError('Erro ao fazer login. Por favor, tente novamente.');
    }
  };

  const handleRegister = () => {
    navigate('/cadastro');
  };

  return (
    <Container>
      <FormWrapper>
        <Title>Login</Title>
        <form onSubmit={handleLogin}>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Input
            type="email"
            placeholder="Email do Administrador"
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
          <CheckboxContainer>
            <Checkbox
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label>Gravar Senha</label>
          </CheckboxContainer>
          <Button type="submit">Entrar</Button>
          <Button type="button" onClick={handleRegister}>Cadastrar-se</Button>
        </form>
      </FormWrapper>
    </Container>
  );
};

export default Login;
