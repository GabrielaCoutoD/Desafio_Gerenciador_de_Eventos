import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.logo}>Meu Projeto</Text>
      <View style={styles.nav}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.navLink}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
          <Text style={styles.navLink}>Cadastro</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'rgb(14, 59, 90)',
  },
  logo: {
    fontSize: 24,
    color: 'white',
  },
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navLink: {
    color: 'white',
    marginLeft: 20,
    fontSize: 18,
    textDecorationLine: 'underline',
  },
  logoutButton: {
    padding: 10,
    marginLeft: 20,
    borderRadius: 5,
    backgroundColor: 'rgb(153, 159, 159)',
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Header;
