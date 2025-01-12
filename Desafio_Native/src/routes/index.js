import React, { useState, useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from '../screens/Login';
import Cadastro from '../screens/Cadastro';
import Home from '../screens/Home';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const user = await AsyncStorage.getItem('@user');
        if (user) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('Erro ao verificar status de login:', error);
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('@user');
      setIsLoggedIn(false);
      Alert.alert('Logout', 'Você saiu com sucesso.');
    } catch (error) {
      console.error('Erro ao sair:', error);
    }
  };

  const LogoutButton = () => (
    <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
      <Text style={styles.logoutText}>Sair</Text>
    </TouchableOpacity>
  );

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Login"
        screenOptions={{
          drawerStyle: {
            backgroundColor: '#f4f4f4',
            width: 240,
          },
          drawerActiveTintColor: '#6200ee',
          drawerInactiveTintColor: 'gray',
        }}
      >
        {!isLoggedIn ? (
          <>
            <Drawer.Screen name="Login">
              {({ navigation }) => <Login onLoginSuccess={() => { setIsLoggedIn(true); navigation.navigate('Home'); }} />}
            </Drawer.Screen>
            <Drawer.Screen name="Cadastro">
              {({ navigation }) => <Cadastro onCadastroSuccess={() => navigation.navigate('Login')} />}
            </Drawer.Screen>
          </>
        ) : (
          <Drawer.Screen name="Home" component={Home} />
        )}
      </Drawer.Navigator>

      {isLoggedIn && <LogoutButton />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  logoutButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    padding: 15,
    backgroundColor: '#ff5c5c',
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
