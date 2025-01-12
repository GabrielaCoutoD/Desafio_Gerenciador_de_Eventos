import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const Cadastro = () => {
  const [adminName, setAdminName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigation = useNavigation();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    try {
      const response = await axios.post('http://192.168.1.10:8088/administradores', {
        nome: adminName,
        email,
        senha: password,
        eventos: []
      });
      
      if (response.status === 200) {
        setSuccess(true);
        Alert.alert('Sucesso', 'Cadastro realizado com sucesso! Redirecionando para a tela de login...');
        setTimeout(() => navigation.navigate('Login'), 2000);
      }
    } catch (error) {
      setError('Erro ao fazer cadastro. Por favor, tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Cadastro</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome do Administrador"
          value={adminName}
          onChangeText={(text) => setAdminName(text)}
          required
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          required
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          required
        />
        <TextInput
          style={styles.input}
          placeholder="Confirmar Senha"
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          secureTextEntry
          required
        />
        {error && <Text style={styles.errorMessage}>{error}</Text>}
        <Button title="Cadastrar-se" onPress={handleRegister} />
        {success && <Text style={styles.successMessage}>Cadastro realizado com sucesso! Redirecionando para a tela de login...</Text>}
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginLink}>Já tem uma conta? Volte ao Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  form: {
    width: 400,
    backgroundColor: '#ffffff',
    padding: 30,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  title: {
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  input: {
    marginBottom: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    fontSize: 16,
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
  },
  successMessage: {
    color: '#28a745',
    fontSize: 16,
    textAlign: 'center',
  },
  loginLink: {
    color: '#007bff',
    textDecorationLine: 'underline',
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
  },
});

export default Cadastro;
