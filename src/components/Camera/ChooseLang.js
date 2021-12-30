// --------------------- REACT SETUP ---------------------
//

import React from 'react';

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

import CHANGE_ICO from '../../assets/images/change.svg';

// --------------------- REDUX SETUP ---------------------
//

import {useSelector, useDispatch} from 'react-redux';

import {
  setTargetLang,
  setSourceLang,
} from '../../context/actions/LanguageActions';

// -------------------------------------------------------

const ChooseLang = () => {
  const {TargetLang, SourceLang} = useSelector(state => state.langReducer);
  const langDispatch = useDispatch();

  const onPressHandler = () => {
    const temp = TargetLang;
    langDispatch(setTargetLang(SourceLang));
    langDispatch(setSourceLang(temp));
  };

  return (
    <View style={styles.mainContainer}>
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
  langChange: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: COLOR.ExternalColor,
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

export default ChooseLang;
