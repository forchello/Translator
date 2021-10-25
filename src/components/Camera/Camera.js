// --------------------- REACT SETUP ---------------------
//

import React, {useState} from 'react';

import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  PermissionsAndroid,
  ToastAndroid,
  //   ActivityIndicator,
} from 'react-native';

// --------------------- CONST SETUP ---------------------
//

import COLOR from '../../constants/Colors';
import SCREEN from '../../constants/ScreenSize';

import CAMERA_ICO from '../../assets/images/camera-not-found.svg';

// --------------------- COMPONENTS ----------------------
//

import ChooseLang from './ChooseLang';
import BottomMenu from './BottomMenu';

// --------------------- REDUX SETUP ---------------------
//

import {useSelector, useDispatch} from 'react-redux';

//
// -------------------------------------------------------

import {RNCamera} from 'react-native-camera';

// -------------------------------------------------------

const CameraSetup = () => {
  ToastAndroid.show('Turn on camera', ToastAndroid.SHORT);
};

const CameraView = ({navigation, permission}) => {
  const {PictureIsTaked, PictureURI} = useSelector(
    state => state.cameraReducer,
  );
  const cameraDispatch = useDispatch();

  if (!permission) {
    return (
      <View style={error_styles.mainContainer}>
        <ChooseLang />
        <View style={error_styles.icoContainer}>
          <CAMERA_ICO />
        </View>
        <View style={error_styles.textsContainer}>
          <Text style={error_styles.h1}> Camera not found </Text>
          <Text style={error_styles.h2}>
            Please make sure your camera is working properly and that you have
            agreed to use the camera. If you still have an error, please contact
            support
          </Text>
        </View>
        <View style={error_styles.buttonContainer}>
          <TouchableOpacity onPress={() => CameraSetup()} activeOpacity={0.7}>
            <View style={error_styles.button}>
              <Text style={error_styles.buttonText}> Try again </Text>
            </View>
          </TouchableOpacity>
        </View>
        <BottomMenu navigation={navigation} />
      </View>
    );
  }

  if (!PictureIsTaked) {
    return (
      <View style={styles.mainContainer}>
        <RNCamera
          style={styles.preview}
          ref={ref => {
            this.camera = ref;
          }}
          type={'back'}
          flashMode={'off'}
          autoFocus={'on'}
          zoom={0}
          whiteBalance={'auto'}
          ratio={'16:9'}
          focusDepth={0}
          trackingEnabled
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          // onTextRecognized={({text}) => {
          //   if ( state ) {
          //     console.log(text);
          //   }
          // }}
        >
          <ChooseLang />
          <View style={styles.freeContainer} />
          <BottomMenu navigation={navigation} />
        </RNCamera>
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        style={styles.PictureContainer}
        resizeMode="cover"
        source={{
          uri: PictureURI,
        }}>
        <ChooseLang />
        <View style={styles.freeContainer} />
        <BottomMenu navigation={navigation} />
      </ImageBackground>
    </View>
  );
};

const Camera = ({navigation}) => {
  const [CameraPermission, setCameraPermission] = useState(false);

  const checkCameraPermission = async () => {
    const result = PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    return result;
  };

  checkCameraPermission().then(perm => {
    setCameraPermission(perm);
  });

  return <CameraView navigation={navigation} permission={CameraPermission} />;
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLOR.ActiveText,
  },
  preview: {
    flex: 1,
  },
  freeContainer: {
    flex: 2,
  },
  PictureContainer: {
    flex: 1,
  },
});

const error_styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#C4C4C4',
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

export default Camera;
