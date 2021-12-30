// --------------------- REACT SETUP ---------------------
//

import React, {useState, useEffect, useRef} from 'react';

import {
  Text,
  TextInput,
  View,
  StyleSheet,
  ToastAndroid,
  ScrollView,
  Pressable,
  Modal,
  TouchableOpacity,
} from 'react-native';

import Clipboard from '@react-native-clipboard/clipboard';

//
// --------------------- REDUX SETUP ---------------------
//

import {useSelector, useDispatch} from 'react-redux';

import {
  setIsMaxLength,
  setTargetText,
  setSourceText,
} from '../context/actions/TranslateActions';

//
// --------------------- CONST SETUP ---------------------
//
import NETWORK from '../constants/Network';
import COLOR from '../constants/Colors';
import SCREEN from '../constants/ScreenSize';
import DEFAULT_TEXT from '../constants/Default';

import LongPressModal from './LongPressModal';

import COPY_ICO from '../assets/images/copy.svg';
import SPEAKER_ICO from '../assets/images/speaker.svg';
import SAVED_ICO from '../assets/images/saved.svg';

// -------------------------------------------------------

const TranslateFORMS = () => {
  const {TargetLang, SourceLang} = useSelector(state => state.langReducer);

  const {IsMaxLength, SourceText, TargetText} = useSelector(
    state => state.translateReducer,
  );

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

  // const [SOURCE_TEXT, setSOURCE_TEXT] = useState('');
  // const [TARGET_TEXT, setTARGET_TEXT] = useState('');

  const [MODAL_VISIBILITY, set_MODAL_VISIBILITY] = useState(false);
  const [MODAL_TIME_OUT, set_MODAL_TIME_OUT] = useState(3000);

  const [MODAL_X, set_MODAL_X] = useState(0);
  const [MODAL_Y, set_MODAL_Y] = useState(0);

  const scrollRef = useRef();

  useEffect(() => {
    console.log('INSIDE USEEFFECT');
    const delayDebounceFn = setTimeout(() => {
      console.log(SourceText);
      if (SourceText !== '') {
        FetchToTranslate(SourceText);
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [SourceText]);

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
      translateDispatch(setTargetText(JSON.parse(responceText).translatedText));
    } catch (err) {
      console.log(err);
    }
  };

  const ChangeTargetInputText = async text => {
    if (text === '') {
      translateDispatch(setTargetText(''));
    }

    translateDispatch(setSourceText(text));

    checkMaxLength(text);
    console.log(text);
  };

  const ShowModal = evt => {
    set_MODAL_Y(evt.nativeEvent.locationY);

    set_MODAL_VISIBILITY(true);

    const delayShowingModal = setTimeout(() => {
      set_MODAL_VISIBILITY(false);
    }, MODAL_TIME_OUT);
  };

  return (
    <View style={{flex: 1, marginLeft: 10, marginRight: 10}}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={MODAL_VISIBILITY}
        onRequestClose={() => {
          set_MODAL_VISIBILITY(false);
        }}>
        <View
          style={[styles.modalCentered, {paddingTop: SCREEN.HEIGHT - MODAL_Y}]}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              onPress={() => {
                set_MODAL_TIME_OUT(3000);
                Clipboard.setString(TargetText);
                ToastAndroid.show('Copied', ToastAndroid.SHORT);
              }}>
              <View style={styles.saved}>
                <COPY_ICO />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                set_MODAL_TIME_OUT(3000);
                ToastAndroid.show('speaker', ToastAndroid.SHORT);
              }}>
              <View style={styles.saved}>
                <SPEAKER_ICO />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                set_MODAL_TIME_OUT(3000);
                ToastAndroid.show('saved', ToastAndroid.SHORT);
              }}>
              <View style={styles.saved}>
                <SAVED_ICO />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.externalContainer}>
        <View style={styles.internalContainer}>
          <TextInput
            multiline
            keyboardType="default"
            value={SourceText}
            style={styles.internalInputText}
            onChangeText={e => ChangeTargetInputText(e)}
            placeholder={DEFAULT_TEXT.INPUT_TEXT}
            selectionColor={COLOR.ActiveText}
            maxLength={DEFAULT_TEXT.MAX_LENGTH}
          />
        </View>
      </View>
      <View
        style={[styles.externalContainer, {marginBottom: SCREEN.HEIGHT / 60}]}>
        <Pressable
          style={styles.internalContainer}
          onLongPress={evt => (TargetText === '' ? {} : ShowModal(evt))}>
          <ScrollView
            ref={scrollRef}
            contentContainerStyle={styles.scrollContainer}
            onContentSizeChange={() =>
              scrollRef.current?.scrollToEnd({animated: true})
            }>
            <Text style={styles.internalText}>{TargetText}</Text>
          </ScrollView>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  externalContainer: {
    // rectangle setup
    flex: 12,
    backgroundColor: COLOR.ExternalColor,
    borderRadius: 20,

    marginTop: SCREEN.HEIGHT / 60,
  },
  internalContainer: {
    // rectangle setup
    flex: 12,
    backgroundColor: COLOR.InternalColor,
    borderRadius: 20,

    margin: 10,
    // centering
    alignItems: 'center',
    justifyContent: 'center',
  },
  internalInputText: {
    flex: 12,
    width: SCREEN.WIDTH - 30,

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
  modalCentered: {
    justifyContent: 'center',
    alignItems: 'center',
    width: ((SCREEN.WIDTH - 40) / 5) * 3 + 20,
  },
  modalContainer: {
    // rectangle setup
    borderRadius: 15,

    // backgroundColor: COLOR.ExternalColor,
    backgroundColor: 'yellow',

    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  saved: {
    // rectangle setup
    backgroundColor: COLOR.InternalColor,
    borderRadius: 15,
    // sizing
    height: SCREEN.HEIGHT / 7 / 2.5,
    width: (SCREEN.WIDTH - 40) / 5,

    marginTop: 6,
    marginBottom: 6,
    // centering
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TranslateFORMS;
