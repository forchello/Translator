// --------------------- REACT SETUP ---------------------
//

import React from 'react';

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
  PermissionsAndroid,
} from 'react-native';

import VoiceButton from './VoiceControll';
//
// --------------------- LIBS SETUP ----------------------
//

// import Voice from '@react-native-voice/voice';

//
// --------------------- REDUX SETUP ---------------------
//

import {useSelector, useDispatch} from 'react-redux';

import {setTargetLang, setSourceLang} from '../context/actions/LanguageActions';

import {
  setIsMaxLength,
  setTargetText,
  setSourceText,
} from '../context/actions/TranslateActions';

//
// --------------------- CONST SETUP ---------------------
//

import COLOR from '../constants/Colors';
import SCREEN from '../constants/ScreenSize';

import BURGER_ICO from '../assets/images/burger.svg';
import SAVED_ICO from '../assets/images/saved.svg';
import CAMERA_ICO from '../assets/images/camera.svg';
import MICRO_ICO from '../assets/images/micro.svg';
import CHANGE_ICO from '../assets/images/change.svg';

// -------------------------------------------------------

const Header = ({navigation}) => {
  const {TargetLang, SourceLang} = useSelector(state => state.langReducer);

  const langDispatch = useDispatch();

  const onPressHandler = () => {
    const temp = TargetLang;
    langDispatch(setTargetLang(SourceLang));
    langDispatch(setSourceLang(temp));
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log(granted);
        navigation.navigate('CameraScreen');
      } else {
        console.log(granted);
        navigation.navigate('CameraError');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.options}>
        <TouchableOpacity
          onPress={() => ToastAndroid.show('drawer', ToastAndroid.SHORT)}>
          <View style={styles.burger}>
            <BURGER_ICO />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => ToastAndroid.show('saved', ToastAndroid.SHORT)}>
          <View style={styles.saved}>
            <SAVED_ICO />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => requestCameraPermission()}>
          <View style={styles.camera}>
            <CAMERA_ICO />
          </View>
        </TouchableOpacity>
        <VoiceButton />
      </View>
      <View style={styles.langChange}>
        <View style={styles.from}>
          <Text style={styles.fromText}> {SourceLang} </Text>
        </View>

        <TouchableOpacity onPress={() => onPressHandler()}>
          <View style={styles.change}>
            <CHANGE_ICO />
          </View>
        </TouchableOpacity>

        <View style={styles.to}>
          <Text style={styles.toText}> {TargetLang} </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    borderRadius: 20,
    backgroundColor: COLOR.ExternalColor,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  burger: {
    // rectangle setup
    backgroundColor: COLOR.InternalColor,
    borderRadius: 15,
    marginRight: (SCREEN.WIDTH - 40) / 5 - 20,

    // sizing
    height: SCREEN.HEIGHT / 7 / 2.5,
    width: (SCREEN.WIDTH - 40) / 5,

    // centering
    justifyContent: 'center',
    alignItems: 'center',
  },
  saved: {
    // rectangle setup
    backgroundColor: COLOR.InternalColor,
    borderRadius: 15,
    // sizing
    height: SCREEN.HEIGHT / 7 / 2.5,
    width: (SCREEN.WIDTH - 40) / 5,

    // centering
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    // rectangle setup
    backgroundColor: COLOR.InternalColor,
    borderRadius: 15,
    // sizing
    height: SCREEN.HEIGHT / 7 / 2.5,
    width: (SCREEN.WIDTH - 40) / 5,

    // centering
    justifyContent: 'center',
    alignItems: 'center',
  },
  micro: {
    // rectangle setup
    backgroundColor: COLOR.InternalColor,
    borderRadius: 15,
    // sizing
    height: SCREEN.HEIGHT / 7 / 2.5,
    width: (SCREEN.WIDTH - 40) / 5,

    // centering
    justifyContent: 'center',
    alignItems: 'center',
  },
  langChange: {
    flexDirection: 'row',
    marginTop: SCREEN.HEIGHT / 26 - 10,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  from: {
    // rectangle setup
    backgroundColor: COLOR.InternalColor,
    borderRadius: 15,

    // sizing
    height: SCREEN.HEIGHT / 7 / 2.5,
    width: (SCREEN.WIDTH - 40) / 2.3,

    // centering
    justifyContent: 'center',
    alignItems: 'center',
  },
  to: {
    // rectangle setup
    backgroundColor: COLOR.InternalColor,
    borderRadius: 15,

    // sizing
    height: SCREEN.HEIGHT / 7 / 2.5,
    width: (SCREEN.WIDTH - 40) / 2.3,

    // centering
    justifyContent: 'center',
    alignItems: 'center',
  },
  change: {
    // rectangle setup
    backgroundColor: COLOR.InternalColor,
    borderRadius: 8,

    // sizing
    height: ((SCREEN.WIDTH - 40) / 7) * 0.6,
    width: ((SCREEN.WIDTH - 40) / 7) * 0.6,

    // centering
    justifyContent: 'center',
    alignItems: 'center',
  },
  fromText: {
    color: COLOR.ActiveText,
    fontFamily: 'SFUIText-Semibold',
    fontSize: 14,
  },
  toText: {
    color: COLOR.PassiveText,
    fontFamily: 'SFUIText-Semibold',
    fontSize: 14,
  },
});

export default Header;
