// --------------------- REACT SETUP ---------------------
//

import React, {useState} from 'react';

import {
  Text,
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  PermissionsAndroid,
  //   ToastAndroid,
  //   ActivityIndicator,
} from 'react-native';

// --------------------- CONST SETUP ---------------------
//

import COLOR from '../../constants/Colors';
import SCREEN from '../../constants/ScreenSize';

import BACK_ICO from '../../assets/images/back.svg';

// --------------------- REDUX SETUP ---------------------
//

import {useSelector, useDispatch} from 'react-redux';

import {
  setPictureIsTaked,
  setPictureURI,
} from '../../context/actions/CameraActions';

//
// -------------------------------------------------------

// const [tempURI, setTempURI] = useState('');

const takePicture = async (camera, cameraDispatch) => {
  if (camera) {
    const options = {quality: 0.5, base64: true};
    const data = await camera.takePictureAsync(options);
    cameraDispatch(setPictureURI(data.uri));
    cameraDispatch(setPictureIsTaked(true));
  }
};

const BottomMenu = ({navigation}) => {
  const {PictureIsTaked, PictureURI} = useSelector(
    state => state.cameraReducer,
  );
  const cameraDispatch = useDispatch();

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        onPress={() => {
          if (!PictureIsTaked) {
            navigation.navigate('HomeScreen');
          }
          cameraDispatch(setPictureIsTaked(false));
        }}
        activeOpacity={0.6}>
        <View style={styles.backContainer}>
          <BACK_ICO />
        </View>
      </TouchableOpacity>

      <View style={styles.shootContainer}>
        <TouchableOpacity
          onPress={() => {
            takePicture(this.camera, cameraDispatch);
            console.log(`${PictureURI} - IS URI`);
            console.log(`${PictureIsTaked} - IS PICTURE IS TAKED`);
          }}
          activeOpacity={0.6}>
          <View
            style={[
              styles.shoot,
              {
                backgroundColor: PictureIsTaked
                  ? COLOR.ActiveText
                  : COLOR.IcoColor,
              },
            ]}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.gallaryContainer}>
        <Text> error </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    borderRadius: 20,
    backgroundColor: COLOR.ExternalColor,
    marginBottom: SCREEN.HEIGHT / 40,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backContainer: {
    // rectangle setup
    backgroundColor: COLOR.InternalColor,
    borderRadius: 15,

    // sizing
    height: SCREEN.HEIGHT / 7 / 2.5,
    width: (SCREEN.WIDTH - 40) / 3.5,

    // centering
    justifyContent: 'center',
    alignItems: 'center',
  },
  shootContainer: {
    // rectangle setup
    backgroundColor: COLOR.InternalColor,
    borderRadius: 15,

    // sizing
    height: SCREEN.HEIGHT / 7 / 2.5,
    width: (SCREEN.WIDTH - 40) / 3,

    // centering
    justifyContent: 'center',
    alignItems: 'center',
  },
  shoot: {
    // rectangle setup
    borderRadius: 12,

    // sizing
    height: SCREEN.HEIGHT / 7 / 2.5 - 10,
    width: (SCREEN.WIDTH - 40) / 6,
  },
  gallaryContainer: {
    // rectangle setup
    backgroundColor: COLOR.InternalColor,
    borderRadius: 15,

    // sizing
    height: SCREEN.HEIGHT / 7 / 2.5,
    width: (SCREEN.WIDTH - 40) / 3.5,

    // centering
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default BottomMenu;
