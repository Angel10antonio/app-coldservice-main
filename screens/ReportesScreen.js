import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import firebase from '../database/firebase';

const { db, firebase: firebaseInstance } = firebase;

const ReportesScreen = ({ navigation }) => {
  const [clientName, setClientName] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [location, setLocation] = useState('');
  const [sucursal, setSucursal] = useState('');
  const [piezaName, setPiezaName] = useState('');
  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [images, setImages] = useState([]); // Estado para múltiples fotos

  const estado = 'completado';

  // Función para abrir la cámara y capturar una imagen
  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Se requiere permiso para acceder a la cámara.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    if (!result.canceled) {
      setImages([...images, result.assets[0].uri]); // Agregar nueva imagen a la lista
    }
  };

  // Función para seleccionar imágenes de la galería
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Se requiere permiso para acceder a la galería.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      setImages([...images, result.assets[0].uri]); // Agregar nueva imagen a la lista
    }
  };

  // Guardar reporte
  const saveReport = async () => {
    if (!clientName || !serviceDescription || !date || !location || !sucursal|| !piezaName) {
      Alert.alert('Error', 'Completa todos los campos.');
      return;
    }

    setLoading(true);
    try {
      await db.collection('reportes').add({
        clientName,
        serviceDescription,
        date: date.toISOString().split('T')[0],
        location,
        sucursal,
        piezaName,
        estado,
        fotos: images, // Guardar la lista de imágenes
        createdAt: firebaseInstance.firestore.FieldValue.serverTimestamp(),
      });

      Alert.alert('Éxito', 'El reporte se ha guardado correctamente.');
      setClientName('');
      setServiceDescription('');
      setDate(new Date());
      setLocation('');
      setPiezaName('');
      setSucursal('');
      setImages([]); // Limpiar las imágenes
      navigation.goBack();
    } catch (error) {
      console.error('Error al guardar el reporte:', error);
      Alert.alert('Error', 'Hubo un problema al guardar el reporte.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Reporte de Servicio</Text>

      <Text style={styles.label}>Nombre del Cliente</Text>
      <TextInput style={styles.input} value={clientName} onChangeText={setClientName} placeholder="Ingresa el nombre" />

      <Text style={styles.label}>Descripción del Servicio</Text>
      <TextInput
        style={[styles.input, styles.multilineInput]}
        value={serviceDescription}
        onChangeText={setServiceDescription}
        placeholder="Describe el servicio"
        multiline
      />

      <Text style={styles.label}>Nombre de la Pieza/s</Text>
      <TextInput style={styles.input} value={piezaName} onChangeText={setPiezaName} placeholder="Ingresa el nombre de la pieza" />

      <Text style={styles.label}>Fecha</Text>
      <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
        <Icon name="event" size={20} color="#fff" />
        <Text style={styles.dateButtonText}>Seleccionar Fecha</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(e, selectedDate) => {
            setShowDatePicker(false);
            setDate(selectedDate || date);
          }}
        />
      )}
      <Text style={styles.selectedDateText}>Fecha seleccionada: {date.toLocaleDateString()}</Text>

      <Text style={styles.label}>Ubicación</Text>
      <TextInput style={styles.input} value={location} onChangeText={setLocation} placeholder="Ingresa la ubicación" />

      <Text style={styles.label}>Sucursal</Text>
      <TextInput style={styles.input} value={sucursal} onChangeText={setSucursal} placeholder="Ingresa el nombre de la Sucursal" />

      {/* Botón para tomar fotos */}
      <TouchableOpacity style={styles.photoButton} onPress={takePhoto}>
        <Icon name="camera-alt" size={20} color="#fff" />
        <Text style={styles.photoButtonText}>Tomar Foto</Text>
      </TouchableOpacity>

      {/* Botón para seleccionar fotos de la galería */}
      <TouchableOpacity style={styles.photoButton} onPress={pickImage}>
        <Icon name="photo-library" size={20} color="#fff" />
        <Text style={styles.photoButtonText}>Seleccionar Foto</Text>
      </TouchableOpacity>

      {/* Mostrar todas las imágenes capturadas */}
      {images.length > 0 && (
        <ScrollView horizontal style={styles.imageContainer}>
          {images.map((img, index) => (
            <Image key={index} source={{ uri: img }} style={styles.imagePreview} />
          ))}
        </ScrollView>
      )}

      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <TouchableOpacity style={styles.saveButton} onPress={saveReport}>
          <Text style={styles.saveButtonText}>Guardar Reporte</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#007bff',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  multilineInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  dateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  selectedDateText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  photoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  photoButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  imageContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 10,
  },
  saveButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15, // Asegura que haya suficiente espacio vertical
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    height: 60,  // Puedes ajustar esta altura si es necesario
    justifyContent: 'center', // Asegura que el texto se centre verticalmente
    marginBottom:30,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ReportesScreen;
