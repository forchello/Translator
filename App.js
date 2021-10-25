import React from 'react';
import {StatusBar, StyleSheet, View, LogBox} from 'react-native';

import {Provider} from 'react-redux';
import {Store} from './src/context/store/Store';

import {useNetInfo} from '@react-native-community/netinfo';

import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';

import NetError from './src/components/NetError';
import Header from './src/components/Header';
import TranslateFORMS from './src/components/TranslateFORMS';

import Camera from './src/components/Camera/Camera';

import COLOR from './src/constants/Colors';
import SCREEN from './src/constants/ScreenSize';

// ------------------------------
// IGNORE REANIMATED 2 WARNING

LogBox.ignoreLogs(['Reanimated 2']);

// ------------------------------

// import forFade from './src/animation/Fade';

// ------------------------------
const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.mainContainer}>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle={'light-content'}
      />
      <Header navigation={navigation} />
      <TranslateFORMS />
    </View>
  );
};

const Stack = createStackNavigator();

const App = () => {
  const netInfo = useNetInfo();

  if (netInfo.isConnected) {
    return (
      <Provider store={Store}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}>
            <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="CameraScreen"
              component={Camera}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  } else {
    return (
      <View style={styles.mainContainer}>
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
    backgroundColor: COLOR.ActiveText,
    paddingTop: SCREEN.HEIGHT / 11,
  },
});

export default App;
