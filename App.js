import React, {useState, useEffect} from 'react';
import {StatusBar, StyleSheet, View, LogBox, Dimensions} from 'react-native';

import {Provider} from 'react-redux';
import {Store} from './src/context/store/Store';

import {useNetInfo} from '@react-native-community/netinfo';

import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {NavigationContainer} from '@react-navigation/native';

import 'react-native-gesture-handler';

import NetError from './src/components/NetError';
import HomeLandscape from './src/components/Lanscape/Home';

import Header from './src/components/Header';
import TranslateFORMS from './src/components/TranslateFORMS';

import Camera from './src/components/Camera/Camera';
import CameraError from './src/components/Camera/CameraError';

import COLOR from './src/constants/Colors';
import SCREEN from './src/constants/ScreenSize';

import changeNavigationBarColor from 'react-native-navigation-bar-color';
import {SafeAreaView} from 'react-native-safe-area-context';

// ------------------------------
// IGNORE REANIMATED 2 WARNING

LogBox.ignoreLogs(['Reanimated 2']);

// ------------------------------

const HomeScreen = ({navigation}) => {
  console.log('YOU IN PORTRAIT');
  return (
    <View style={styles.mainContainer}>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle={'light-content'}
      />
      <View style={{height: StatusBar.currentHeight}} />
      <SafeAreaView style={{flex: 1}}>
        <Header navigation={navigation} />
        <TranslateFORMS />
      </SafeAreaView>
    </View>
  );
};

const HomeScreenLandscape = ({navigation}) => {
  console.log('YOU IN LANSCAPE');
  return <HomeLandscape navigation={navigation} />;
};

const Stack = createNativeStackNavigator();

const App = () => {
  const netInfo = useNetInfo();

  const [ORIENTATION, set_ORIENTATION] = useState('Portrait');

  Dimensions.addEventListener('change', () => {
    if (SCREEN.isPortrait()) {
      console.log('Portrait');
      set_ORIENTATION('Portrait');
    } else {
      console.log('Landscape');
      set_ORIENTATION('Landscape');
    }
  });

  // СОСТОЯНИЕ ОРИЕНТАЦИИ ЭКРАНА

  if (netInfo.isConnected) {
    changeNavigationBarColor(COLOR.ActiveText);
    return (
      <Provider store={Store}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              headerShown: false,
            }}>
            <Stack.Screen
              name="HomeScreen"
              component={
                ORIENTATION === 'Portrait' ? HomeScreen : HomeScreenLandscape
              }
            />
            <Stack.Screen name="CameraScreen" component={Camera} />
            <Stack.Screen name="CameraError" component={CameraError} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  } else {
    changeNavigationBarColor(COLOR.ActiveText);
    return (
      <View style={styles.errorContainer}>
        <StatusBar
          translucent={true}
          backgroundColor={'transparent'}
          barStyle={'light-content'}
        />
        <NetError />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COLOR.ActiveText,
  },
  errorContainer: {
    flex: 1,
    backgroundColor: COLOR.ActiveText,
  },
});

export default App;
