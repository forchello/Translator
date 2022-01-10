// --------------------- REACT SETUP ---------------------
//

import React from 'react';

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  //   ActivityIndicator,
} from 'react-native';

import changeNavigationBarColor from 'react-native-navigation-bar-color';

// --------------------- CONST SETUP ---------------------
//

import COLOR from '../../constants/Colors';
import SCREEN from '../../constants/ScreenSize';

import CAMERA_ICO from '../../assets/images/camera-not-found.svg';

// --------------------- COMPONENTS ----------------------
//

import ChooseLang from './ChooseLang';
import BottomMenu from './BottomMenu';

import {camera_permission_android} from '../Requests/CameraRequest.android';
import {camera_permission_ios} from '../Requests/CameraRequest.ios';

// --------------------- REDUX SETUP ---------------------
//

import {useSelector, useDispatch} from 'react-redux';

import {setCameraState} from '../../context/actions/CameraActions';

//
// -------------------------------------------------------

const CameraErrorView = ({navigation, permission}) => {
  const {CameraState} = useSelector(state => state.cameraReducer);
  const cameraDispatch = useDispatch();

  const requestCameraPermission = async () => {
    switch (Platform.OS) {
      case 'android':
        console.log('camera android');
        camera_permission_android({navigation});
        break;
      case 'ios':
        console.log('camera ios');
        camera_permission_ios({navigation});
        break;
      default:
        console.log('Your system is not supported');
    }
  };

  if (!permission) {
    return (
      <View style={error_styles.mainContainer}>
        <SafeAreaView style={{flex: 1}}>
          <View style={{height: SCREEN.STATUS_BAR_HEIGHT}} />
          <ChooseLang />
          <View style={error_styles.preview} />
          <View style={error_styles.icoContainer}>
            <CAMERA_ICO />
          </View>
          <View style={error_styles.textsContainer}>
            <Text style={error_styles.h1}> Camera not found </Text>
            <Text style={error_styles.h2}>
              Please make sure your camera is working properly and that you have
              agreed to use the camera. If you still have an error, please
              contact support
            </Text>
          </View>
          <View style={error_styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => requestCameraPermission()}
              activeOpacity={0.7}>
              <View style={error_styles.button}>
                <Text style={error_styles.buttonText}> Try again </Text>
              </View>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    );
  }
};

const error_styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#C4C4C4',
  },
  preview: {
    flex: 1,
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

export default CameraErrorView;
