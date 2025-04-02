import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
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

      {/* Botón de registros (visible para todos) */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ConsultarReportesScreen', { userRole })}
      >
        <Text style={styles.buttonText}>Registros</Text>
      </TouchableOpacity>

      {/* Contenedor de los botones cuadrados en una fila */}
      <View style={styles.squareButtonContainer}>
        {/* Botón cuadrado: Reporte de Reparación */}
        <TouchableOpacity
          style={[styles.squareButton, { marginRight: 30 }]} // Separar con margen a la derecha
          onPress={() => navigation.navigate('ProcesoReparacionScreen')}
        >
          <FontAwesome name="wrench" size={30} color="#fff" />
          <Text style={styles.squareButtonText}>Reporte de Reparación</Text>
        </TouchableOpacity>

        {/* Botón cuadrado: Consulta Reporte de Reparación */}
        <TouchableOpacity
          style={styles.squareButton }
          onPress={() => navigation.navigate('ConsultarProcesoReparacionesScreen')}
        >
          <FontAwesome name="search" size={24} color="#fff" />
          <Text style={styles.squareButtonText}>Consultar Reparación</Text>
        </TouchableOpacity>
      </View>

      {/* Botón de Servicio (solo para admin) */}
      {userRole === 'admin' && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('UserList')}
        >
          <Text style={styles.buttonText}>Servicio</Text>
        </TouchableOpacity>
      )}
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
  // Estilo para los botones cuadrados en una fila
  squareButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    width: '80%',
  },
  squareButton: {
    width: 150,
    height: 150,
    backgroundColor: '#0303b5',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginHorizontal: -20, // Asegura que esté centrado en su contenedor
    marginVertical: 10, // Ajusta la posición verticalmente si es necesario
  },
  squareButtonText: {
    marginTop: 10,
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomeScreen;
