import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { CalculadoraScreen } from './src/screens/CalculadoraScreen';
import { styles } from './src/theme/appTheme';

const App = () => {
  return (
    // aplicamos los estilos del archivo theme/appTheme.jsx
    <SafeAreaView style= { styles.fondo }>
      {/* el statusBar es la barra superior del movil para ios usamos el barSytle para que se sigan viendo las letras de fondo*/}
      <StatusBar
        backgroundColor="black"
        barStyle="light-content"
      />
      <CalculadoraScreen />
    </SafeAreaView>
  );
};

export default App;
