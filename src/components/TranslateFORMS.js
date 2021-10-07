// --------------------- REACT SETUP ---------------------
//

import React, {useState} from 'react';

import {Text, TextInput, View, StyleSheet, ToastAndroid} from 'react-native';

//
// --------------------- REDUX SETUP ---------------------
//

import {useSelector, useDispatch} from 'react-redux';

import {
  setTargetText,
  setSourceText,
  setIsMaxLength,
} from '../context/actions/TranslateActions';

//
// --------------------- CONST SETUP ---------------------
//

import COLOR from '../constants/Colors';
import SCREEN from '../constants/ScreenSize';
import DEFAULT_TEXT from '../constants/Default';

// -------------------------------------------------------

const TranslateFORMS = () => {
  const {TargetText, SourceText, IsMaxLength} = useSelector(
    state => state.translateReducer,
  );
  const translateDispatch = useDispatch();

  const maxLengthMessage = text => {
    if (text.length === DEFAULT_TEXT.MAX_LENGTH) {
      translateDispatch(setIsMaxLength(true));
      ToastAndroid.show('max length', ToastAndroid.SHORT);
    }

    if (IsMaxLength === true) {
      if (text.length < DEFAULT_TEXT.MAX_LENGTH) {
        translateDispatch(setIsMaxLength('false'));
      } else {
        ToastAndroid.show('max length', ToastAndroid.SHORT);
      }
    }
  };

  const ChangeTargetInputText = text => {
    maxLengthMessage(text);
    console.log(text);
    translateDispatch(setTargetText(text));
    translateDispatch(setSourceText(text));
  };

  return (
    <View>
      <View style={styles.externalContainer}>
        <View style={styles.internalContainer}>
          <TextInput
            multiline
            keyboardType="default"
            style={styles.internalInputText}
            onChangeText={val => ChangeTargetInputText(val)}
            placeholder={DEFAULT_TEXT.INPUT_TEXT}
            selectionColor={COLOR.ActiveText}
            maxLength={DEFAULT_TEXT.MAX_LENGTH}
          />
        </View>
      </View>
      <View style={styles.externalContainer}>
        <View style={styles.internalContainer}>
          <Text
            adjustsFontSizeToFit
            minimumFontScale={0.5}
            allowFontScaling
            style={styles.internalText}>
            {SourceText}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  externalContainer: {
    // rectangle setup
    backgroundColor: COLOR.ExternalColor,
    borderRadius: 20,

    // margin
    marginLeft: 10,
    marginRight: 10,
    marginTop: SCREEN.HEIGHT / 60,

    // sizing
    height: SCREEN.HEIGHT / 2.5 - 10,
    width: SCREEN.WIDTH - 20,

    // // centering
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  internalContainer: {
    // rectangle setup
    backgroundColor: COLOR.InternalColor,
    borderRadius: 20,
    margin: 10,

    // sizing
    marginTop: SCREEN.HEIGHT / 60,
    height: SCREEN.HEIGHT / 2.5 - 20 - 10,
    width: SCREEN.WIDTH - 40,

    // centering
    alignItems: 'center',
    justifyContent: 'center',
  },
  internalInputText: {
    // sizing
    height: SCREEN.HEIGHT / 2.5 - 20 - 10 - 20,
    width: SCREEN.WIDTH - 40 - 20,

    color: COLOR.ActiveText,
    fontFamily: 'SFUIText-Semibold',
    fontSize: 0.1 * SCREEN.WIDTH,
    textAlign: 'center',
  },
  internalText: {
    color: COLOR.PassiveText,
    fontFamily: 'SFUIText-Semibold',
    fontSize: 0.1 * SCREEN.WIDTH,
    textAlign: 'center',
  },
});

export default TranslateFORMS;
