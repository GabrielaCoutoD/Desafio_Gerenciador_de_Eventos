import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Alert } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import backgroundImg from '../../../assets/fundo.jpg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8088/administradores/login', {
        email,
        senha: password,
      });
      if (response.status === 200) {
        navigation.navigate('Home');
      } else {
        Alert.alert('Erro', 'Credenciais inválidas. Por favor, tente novamente.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao fazer login. Por favor, tente novamente.');
    }
  };

  const handleRegister = () => {
    navigation.navigate('Cadastro');
  };

  return (
    <View style={styles.container}>
      <Image source={backgroundImg} style={styles.background} />
      <View style={styles.formWrapper}>
        <Text style={styles.title}>Login</Text>
        {error ? <Text style={styles.errorMessage}>{error}</Text> : null}
        <TextInput
          style={styles.input}
          placeholder="Email do Administrador"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={rememberMe}
            onValueChange={setRememberMe}
            style={styles.checkbox}
          />
          <Text style={styles.checkboxLabel}>Gravar Senha</Text>
        </View>
        <Button title="Entrar" onPress={handleLogin} color="rgb(14, 59, 90)" />
        <Button title="Cadastrar-se" onPress={handleRegister} color="#0056b3" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  formWrapper: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 40,
    borderRadius: 10,
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    width: 400,
    alignItems: 'center',
  },
  title: {
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
    fontSize: 24,
  },
  input: {
    width: '100%',
    marginBottom: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    marginRight: 10,
  },
  checkboxLabel: {
    fontSize: 16,
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 15,
  },
});

export default Login;
