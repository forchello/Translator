import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  LogBox,
  TouchableOpacity,
  ActivityIndicator,
  PermissionsAndroid,
  Button,
} from 'react-native';

import Voice, {
  SpeechRecognizedEvent,
  SpeechResultsEvent,
  SpeechErrorEvent,
} from '@react-native-voice/voice';

// ----------------------------------------
// REDUX

import {useSelector, useDispatch} from 'react-redux';

import {setSourceText} from '../context/actions/TranslateActions';

// ----------------------------------------
import COLOR from '../constants/Colors';
import SCREEN from '../constants/ScreenSize';

import MICRO_ICO from '../assets/images/micro.svg';
import translateReducer from '../context/reducers/TranslateReducers';

LogBox.ignoreLogs(['new NativeEventEmitter()']);

const Micro = () => {
  // REACT HOOKS
  const [MicroIsLoading, setMicroIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [result, setResult] = useState(false);
  const [partResult, setPartResult] = useState(false);

  // REDUX HOOKS
  const {SourceLang} = useSelector(state => state.langReducer);
  const translateDispatch = useDispatch();

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechPartialResults = onSpeechPartialResults;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSpeechStart = e => {
    console.log('onSpeechStart: ', e);
    setMicroIsLoading(true);
  };

  const onSpeechEnd = e => {
    console.log('onSpeechEnd: ', e);
    setMicroIsLoading(false);
  };

  const onSpeechResults = e => {
    console.log('onSpeechResults: ', e);
    setResult(e.value);

    if (typeof e.value !== undefined) {
      translateDispatch(setSourceText(e.value[0]));
    }
  };

  const onSpeechPartialResults = e => {
    console.log('onSpeechPartialResults: ', e);
    setPartResult(e.value);
  };

  const _startRecognizing = async () => {
    if (await requestCameraPermission()) {
      try {
        setMicroIsLoading(true);
        await Voice.start(SourceLang);
      } catch (e) {
        console.error(e);
      }
    } else {
      console.log('micro permissions error');
    }
  };

  const _stopRecognizing = async () => {
    try {
      setMicroIsLoading(false);
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Permission to use audio',
          message: 'We need your permission to use your micro',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.warn(err);
    }
  };

  if (!MicroIsLoading) {
    return (
      <TouchableOpacity onPress={() => _startRecognizing()}>
        <View style={styles.micro}>
          <MICRO_ICO />
        </View>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity onPress={() => _stopRecognizing()}>
        <View style={styles.micro}>
          <ActivityIndicator size={24} color={COLOR.ActiveText} />
        </View>
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
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
});

export default Micro;
