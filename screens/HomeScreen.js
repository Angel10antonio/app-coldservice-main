import React from 'react';
import { View, Text, TouchableOpacity, Linking, StyleSheet, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { auth } from '../database/firebase';


const HomeScreen = ({ navigation, route }) => {
  const { userRole } = route.params; // Obtén el rol del usuario

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigation.replace('LoginScreen'); // Cierra sesión y redirige al LoginScreen
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      Alert.alert('Error', 'No se pudo cerrar la sesión.');
    }
  };

  const handleGoBack = () => {
    navigation.navigate('LoginScreen'); // Regresa al LoginScreen sin cerrar sesión
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cold Service</Text>

      {/* Botón de Reportes (visible para todos) */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ReportesScreen')}
      >
        <Text style={styles.buttonText}>Reportes</Text>
      </TouchableOpacity>

      {/* Botón de Registros (visible para todos) */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ConsultarReportesScreen', { userRole })}
      >
        <Text style={styles.buttonText}>Registros</Text>
      </TouchableOpacity>

      {/* Botón de Servicio (solo para admin) */}
      {userRole === 'admin' && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('UserList')}
        >
          <Text style={styles.buttonText}>Servicio</Text>
        </TouchableOpacity>
      )}

      {/* Barra de íconos al pie de la pantalla */}
      <View style={styles.bottomBar}>
        
        {/* Botón de Mensajes */}
        <TouchableOpacity style={styles.mensajes}>
          <FontAwesome name="comments" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.configuracion}
          onPress={() => navigation.navigate('ConfigScreen')} // Navega a la pantalla de configuración
        >
          <FontAwesome name="cogs" size={24} color="black" />
        </TouchableOpacity>

        {/* Botón de Home */}
        <TouchableOpacity style={styles.menu}// Navega a la pantalla de configuración
        >

          <FontAwesome name="home" size={24} color="black" />
        </TouchableOpacity>

        {/* Botón de Cerrar Sesión */}
        <TouchableOpacity
          style={styles.cerrarsesion}
          onPress={handleGoBack} // Regresa al LoginScreen
        >
          <FontAwesome name="sign-out" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
  },
  button: {
    width: '80%',
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    backgroundColor: '#f5f5f5', // Fondo de la barra
    borderTopWidth: 1,
    borderTopColor: 'grey',
  },
  menu: {
    padding: 15,
    backgroundColor: '#ddd',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    right: 190
  },
  mensajes: {
    padding: 15,
    backgroundColor: '#ddd',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    left: 95,
  },
  configuracion: {
    padding: 15,
    backgroundColor: '#ddd',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    left: 100,
  },
  cerrarsesion: {
    padding: 15,
    backgroundColor: '#ddd',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
