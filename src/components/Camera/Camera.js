// --------------------- REACT SETUP ---------------------
//

import React, {useState} from 'react';

import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
} from 'react-native';

import changeNavigationBarColor from 'react-native-navigation-bar-color';

// --------------------- CONST SETUP ---------------------
//

import COLOR from '../../constants/Colors';
import SCREEN from '../../constants/ScreenSize';

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

const Camera = ({navigation}) => {
  const {PictureIsTaked, PictureURI} = useSelector(
    state => state.cameraReducer,
  );

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
          focusDepth={0}
          trackingEnabled
          captureAudio={false}
          //cameraViewDimensions={{width: SCREEN.WIDTH, height: SCREEN.HEIGHT}}
        >
          <SafeAreaView style={{flex: 1}}>
            <View style={{height: SCREEN.STATUS_BAR_HEIGHT}} />
            <ChooseLang />
            <View style={styles.freeContainer} />
            <BottomMenu navigation={navigation} />
          </SafeAreaView>
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
        <SafeAreaView style={{flex: 1}}>
          <View style={{height: SCREEN.STATUS_BAR_HEIGHT}} />
          <ChooseLang />
          <View style={styles.freeContainer} />
          <BottomMenu navigation={navigation} />
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
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

export default Camera;
