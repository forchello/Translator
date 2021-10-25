// --------------------- REACT SETUP ---------------------
//

import React, {useState, useEffect} from 'react';

import {
  Text,
  TextInput,
  View,
  StyleSheet,
  ToastAndroid,
  Keyboard,
} from 'react-native';

//
// --------------------- REDUX SETUP ---------------------
//

import {useSelector, useDispatch} from 'react-redux';

import {setIsMaxLength} from '../context/actions/TranslateActions';

//
// --------------------- CONST SETUP ---------------------
//
import NETWORK from '../constants/Network';
import COLOR from '../constants/Colors';
import SCREEN from '../constants/ScreenSize';
import DEFAULT_TEXT from '../constants/Default';

// -------------------------------------------------------

const TranslateFORMS = () => {
  const {TargetLang, SourceLang} = useSelector(state => state.langReducer);
  const {IsMaxLength} = useSelector(state => state.translateReducer);

  const translateDispatch = useDispatch();

  const checkMaxLength = text => {
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

  const [SOURCE_TEXT, setSOURCE_TEXT] = useState('');
  const [TARGET_TEXT, setTARGET_TEXT] = useState('');

  useEffect(() => {
    console.log('INSIDE USEEFFECT');
    const delayDebounceFn = setTimeout(() => {
      console.log(SOURCE_TEXT);
      if (SOURCE_TEXT !== '') {
        FetchToTranslate(SOURCE_TEXT);
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  });

  const FetchToTranslate = async text => {
    try {
      const translateData = JSON.stringify({
        FromText: text,
        FromLang: SourceLang,
        ToLang: TargetLang,
      });
      const response = await fetch(
        'http://' + NETWORK.IP + ':' + NETWORK.PORT + '/api/translate/',
        // NETWORK.ADRESS + '/api/translate/',
        {
          method: 'post',
          body: translateData,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const responceText = await response.text();
      console.log(JSON.parse(responceText).translatedText);
      setTARGET_TEXT(JSON.parse(responceText).translatedText);
    } catch (err) {
      console.log(err);
    }
  };

  const ChangeTargetInputText = async text => {
    if (text === '') {
      setTARGET_TEXT('');
    }
    setSOURCE_TEXT(text);

    // const temp = await translate(SOURCE_TEXT, {
    //   from: SourceLang,
    //   to: TargetLang,
    // });
    checkMaxLength(text);
    console.log(text);
  };

  return (
    <View>
      <View style={styles.externalContainer}>
        <View style={styles.internalContainer}>
          <TextInput
            multiline
            keyboardType="default"
            style={styles.internalInputText}
            onChangeText={e => ChangeTargetInputText(e)}
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
            {TARGET_TEXT}
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
