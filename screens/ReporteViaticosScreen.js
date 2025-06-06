import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ReporteViaticosScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Reporte de Viaticos</Text>
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default ReporteViaticosScreen;
