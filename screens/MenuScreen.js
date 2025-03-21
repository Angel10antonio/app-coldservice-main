import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const MenuScreen = ({ navigation }) => {
  const userRole = 'user'; // Ejemplo: Aquí puedes definir o traer el rol del usuario desde donde sea necesario

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pantalla de Menú</Text>

      {/* Barra de íconos al pie de la pantalla */}
      <View style={styles.bottomBar}>
        
        {/* Botón de Home que redirige a MenuScreen */}
        <TouchableOpacity
          style={styles.menu}
          onPress={() => navigation.navigate('MenuScreen')} // Redirige a MenuScreen
        >
          <FontAwesome name="home" size={24} color="black" />
        </TouchableOpacity>

        {/* Botón de Mensajes */}
        <TouchableOpacity style={styles.mensajes}>
          <FontAwesome name="comments" size={24} color="black" />
        </TouchableOpacity>

        {/* Botón de Configuración */}
        <TouchableOpacity
          style={styles.configuracion}
          onPress={() => navigation.navigate('ConfigScreen')} // Navega a la pantalla de configuración
        >
          <FontAwesome name="cogs" size={24} color="black" />
        </TouchableOpacity>

        {/* Botón de Cerrar Sesión */}
        <TouchableOpacity
          style={styles.cerrarsesion}
          onPress={() => navigation.replace('LoginScreen')} // Redirige a LoginScreen (sin cerrar sesión aquí)
        >
          <FontAwesome name="sign-out" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Botón de Generar Reportes */}
      <TouchableOpacity
        style={styles.textButton}
        onPress={() => navigation.navigate('HomeScreen', { userRole: userRole })}
      >
        <Text style={styles.textButtonText}>Generar Reportes</Text>
      </TouchableOpacity>

      {/* Botón de reporte de Viaticos */}
      <TouchableOpacity
        style={styles.textButton}
        onPress={() => navigation.navigate('ReporteViaticosScreen', { userRole: userRole })}
      >
        <Text style={styles.textButtonText}>Reporte de Viaticos</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  textButton: {
    marginTop: 20,
    padding: 10,
  },
  textButtonText: {
    fontSize: 18,
    color: '#007bff',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderTopWidth: 1,
    borderTopColor: 'grey',
  },
  menu: {
    padding: 15,
    backgroundColor: '#ddd',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mensajes: {
    padding: 15,
    backgroundColor: '#ddd',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  configuracion: {
    padding: 15,
    backgroundColor: '#ddd',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cerrarsesion: {
    padding: 15,
    backgroundColor: '#ddd',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MenuScreen;
