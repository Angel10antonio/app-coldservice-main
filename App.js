import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './context/AuthContext'; // Importa el AuthProvider
import { ThemeProvider } from './context/ThemeContext';
import HomeTabs from './screens/HomeTabs';

// Importa las pantallas
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/MainHomeScreen';
import UserList from './screens/UserList';
import CreateUserScreen from './screens/CreateUserScreen';
import UserDetailScreen from './screens/UserDetailScreen';
import ReportesScreen from './screens/ReportesScreen';
import ReporteViaticosScreen from './screens/ReporteViaticosScreen'; // Importa la pantalla de reporte de viáticos
import ConsultarReportesScreen from './screens/ConsultarReportesScreen';
import ConfigScreen from './screens/ConfigScreen';
import ProcesoReparacionScreen from './screens/ProcesoReparacionScreen';
import ConsultarProcesoReparacionesScreen from './screens/ConsultarProcesoReparacionesScreen'; // Agrega la importación


// Crea el navegador de pila
const Stack = createNativeStackNavigator();


// Define la pila de navegación
function MyStack() {
  return (
    <ThemeProvider>
      <Stack.Navigator>
  {/* Pantalla de inicio de sesión */}
  <Stack.Screen
    name="LoginScreen"
    component={LoginScreen}
    options={{ headerShown: false }} // Oculta el header en LoginScreen
  />

  {/* Pantalla principal */}
  <Stack.Screen
    name="HomeScreen"
    component={HomeTabs} // ahora usa el Bottom Tabs
    options={{ headerShown: false }}
  />
  
  {/* Otras pantallas */}
  <Stack.Screen
    name="UserList"
    component={UserList}
    options={{ title: 'Lista de Usuarios' }}
  />
  <Stack.Screen
    name="CreateUserScreen"
    component={CreateUserScreen}
    options={{ title: 'Crear Usuario' }}
  />
  <Stack.Screen
    name="UserDetailScreen"
    component={UserDetailScreen}
    options={{ title: 'Detalle del Usuario' }}
  />
  <Stack.Screen
    name="ReportesScreen"
    component={ReportesScreen}
    options={{ title: 'Reportes de Servicio' }}
  />
  <Stack.Screen
    name="ConsultarReportesScreen"
    component={ConsultarReportesScreen}
    options={{ title: 'Consultar Reportes' }}
  />

  {/* Nueva pantalla de reporte de viáticos */}
  <Stack.Screen
    name="ReporteViaticosScreen" // Registra la pantalla de reporte de viáticos
    component={ReporteViaticosScreen}
    options={{ title: 'Reporte de Viáticos' }}
  />

  {/* Pantalla de configuración */}
  <Stack.Screen
    name="ConfigScreen"
    component={ConfigScreen}
    options={{ title: 'Configuración' }}
  />

  {/* Pantalla de PROCESO DE REPARACION */}
  <Stack.Screen 
    name="ProcesoReparacionScreen"
    component={ProcesoReparacionScreen}
    options={{ title: 'Proceso de Reparación' }}
  />

  {/* Pantalla de CONSULTAR PROCESO DE REPARACION */}
  <Stack.Screen
    name="ConsultarProcesoReparacionesScreen"
    component={ConsultarProcesoReparacionesScreen}
    options={{ title: 'Consultar Reportes de Reparación' }}
  />
</Stack.Navigator>

    </ThemeProvider>
  );
}

// Componente principal de la aplicación
export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </AuthProvider>
  );
}



