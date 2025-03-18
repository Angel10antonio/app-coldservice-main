import React, { useEffect, useState } from 'react';
import { 
  View, Text, StyleSheet, ScrollView, TouchableOpacity, 
  Alert, ActivityIndicator, Image, Modal 
} from 'react-native';
import firebase from '../database/firebase';

const { db } = firebase;

const ConsultarReportesScreen = ({ route }) => {
  const { userRole } = route.params;
  const [reportes, setReportes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showOptions, setShowOptions] = useState({});
  
  // Estado para manejar el modal y la imagen seleccionada
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchReportes = async () => {
      try {
        const querySnapshot = await db.collection('reportes').get();
        const reportesData = [];
        querySnapshot.forEach((doc) => {
          reportesData.push({ id: doc.id, ...doc.data() });
        });
        setReportes(reportesData);
      } catch (error) {
        console.error('Error al obtener los reportes:', error);
        Alert.alert('Error', 'Hubo un problema al cargar los reportes.');
      } finally {
        setLoading(false);
      }
    };

    fetchReportes();
  }, []);

  const updateEstado = async (id, nuevoEstado) => {
    if (userRole !== 'admin') {
      Alert.alert('Error', 'No tienes permisos para cambiar el estado.');
      return;
    }

    try {
      await db.collection('reportes').doc(id).update({ estado: nuevoEstado });
      setReportes((prevReportes) =>
        prevReportes.map((reporte) =>
          reporte.id === id ? { ...reporte, estado: nuevoEstado } : reporte
        )
      );
      Alert.alert('Éxito', 'El estado del reporte se ha actualizado correctamente.');
    } catch (error) {
      console.error('Error al actualizar el estado:', error);
      Alert.alert('Error', 'Hubo un problema al actualizar el estado.');
    }
  };

  const toggleOptions = (id) => {
    setShowOptions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Función para abrir la imagen en el modal
  const openImageModal = (imageUri) => {
    setSelectedImage(imageUri);
    setModalVisible(true);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Reportes Generados</Text>

      {reportes.length === 0 ? (
        <Text style={styles.noReportesText}>No hay reportes registrados.</Text>
      ) : (
        reportes.map((reporte) => (
          <View key={reporte.id} style={styles.reporteContainer}>
            {/*<Text style={styles.label}>Nombre del Cliente: {reporte.clientName}</Text>*/}
            {/*<Text style={styles.label}>Descripción: {reporte.serviceDescription}</Text>*/}
            {/*<Text style={styles.label}>Fecha: {reporte.date}</Text>*/}
            {/*<Text style={styles.label}>Ubicación: {reporte.location}</Text>*/}
            {/*<Text style={styles.label}>Nombre de la Pieza: {reporte.piezaName}</Text>*/}  
            {/*<Text style={styles.label}>Estado Actual: {reporte.estado || 'proceso'}</Text> */}
           
           <Text style={styles.label}>Nombre del Cliente: {reporte.clientName || 'Sin nombre'}</Text>
           <Text style={styles.label}>Descripción: {reporte.serviceDescription || 'Sin descripción'}</Text>
           <Text style={styles.label}>Fecha: {reporte.date || 'Fecha no disponible'}</Text>
           <Text style={styles.label}>Ubicación: {reporte.location || 'Ubicación desconocida'}</Text>
           <Text style={styles.label}>Nombre de la Pieza: {reporte.piezaName || 'Pieza no especificada'}</Text>
           <Text style={styles.label}>Estado Actual: {reporte.estado || 'proceso'}</Text>

            {userRole === 'admin' && (
              <TouchableOpacity
                style={styles.button}
                onPress={() => toggleOptions(reporte.id)}
              >
                <Text style={styles.buttonText}>Cambiar Estado</Text>
              </TouchableOpacity>
            )}

            {showOptions[reporte.id] && userRole === 'admin' && (
              <View style={styles.optionsContainer}>
                <TouchableOpacity
                  style={styles.optionButton}
                  onPress={() => updateEstado(reporte.id, 'proceso')}
                >
                  <Text style={styles.optionButtonText}>Proceso</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.optionButton}
                  onPress={() => updateEstado(reporte.id, 'completado')}
                >
                  <Text style={styles.optionButtonText}>Completado</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.optionButton}
                  onPress={() => updateEstado(reporte.id, 'pagado')}
                >
                  <Text style={styles.optionButtonText}>Pagado</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Mostrar todas las imágenes del reporte */}
            {reporte.fotos && reporte.fotos.length > 0 && (
              <ScrollView horizontal style={styles.imageContainer}>
                {reporte.fotos.map((foto, index) => (
                  <TouchableOpacity key={index} onPress={() => openImageModal(foto)}>
                    <Image source={{ uri: foto }} style={styles.photo} />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </View>
        ))
      )}

      {/* Modal para ver la imagen a pantalla completa */}
      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <Image source={{ uri: selectedImage }} style={styles.fullScreenImage} />
          <TouchableOpacity
            style={styles.closeModalButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeModalButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  noReportesText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  reporteContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  optionsContainer: {
    marginTop: 10,
  },
  optionButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
    alignItems: 'center',
  },
  optionButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  imageContainer: {
    marginTop: 10,
    flexDirection: 'row',
  },
  photo: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  fullScreenImage: {
    width: '100%',
    height: '80%',
    resizeMode: 'contain',
  },
  closeModalButton: {
    position: 'absolute',
    bottom: 30,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
  },
  closeModalButtonText: {
    fontSize: 16,
    color: '#007bff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ConsultarReportesScreen;
