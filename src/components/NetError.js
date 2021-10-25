// --------------------- REACT SETUP ---------------------
//

import React from 'react';

import {
  Text,
  View,
  StyleSheet,
  ToastAndroid,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

// --------------------- CONST SETUP ---------------------
//

import COLOR from '../constants/Colors';
import SCREEN from '../constants/ScreenSize';

import WIFI_ICO from '../assets/images/wifi.svg';

// -------------------------------------------------------

const NetError = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.freeContainer} />
      <View style={styles.icoContainer}>
        <WIFI_ICO />
      </View>
      <View style={styles.textsContainer}>
        <Text style={styles.h1}> Failed internet connection </Text>
        <Text style={styles.h2}>
          Please make sure you are connected to the internet. If you still have
          an error, please contact support
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() =>
            ToastAndroid.show('Turn on the Enternet', ToastAndroid.SHORT)
          }
          activeOpacity={0.7}>
          <View style={styles.button}>
            <Text style={styles.buttonText}> Try again </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.freeContainer} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  freeContainer: {
    flex: 3,
  },
  icoContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textsContainer: {
    flex: 2,
  },
  h1: {
    color: COLOR.ExternalColor,
    fontFamily: 'SFUIText-Bold',
    fontSize: 20,

    textAlign: 'center',
    marginBottom: 15,
  },
  h2: {
    color: COLOR.InternalColor,
    fontFamily: 'SFUIText-Semibold',
    fontSize: 14,

    textAlign: 'center',
    paddingLeft: 65,
    paddingRight: 65,
  },
  buttonContainer: {
    flex: 2,

    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#D6D6D6',
    borderRadius: 15,

    height: SCREEN.HEIGHT / 7 / 2.5,
    width: (SCREEN.WIDTH - 40) / 2,

    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: COLOR.ActiveText,
    fontFamily: 'SFUIText-Semibold',
    fontSize: 14,
  },
});

export default NetError;
