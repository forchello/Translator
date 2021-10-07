import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {Provider} from 'react-redux';
import {Store} from './src/context/store/Store';

import Header from './src/components/Header';
import TranslateFORMS from './src/components/TranslateFORMS';

const App = () => {
  return (
    <Provider store={Store}>
      <View style={styles.mainContainer}>
        <StatusBar backgroundColor="#0070D7" barStyle={'light-content'} />
        <Header />
        <TranslateFORMS />
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#0070D7',
    justifyContent: 'center',
  },
});

export default App;
