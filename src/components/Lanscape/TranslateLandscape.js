import React, {useState} from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  Text,
  TextInput,
  ToastAndroid,
  Pressable,
  ScrollView,
  Modal,
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
} from '../../context/actions/TranslateActions';

//
// --------------------- CONST SETUP ---------------------
//

import COLOR from '../../constants/Colors';
import SCREEN from '../../constants/ScreenSize';
import DEFAULT_TEXT from '../../constants/Default';

// -------------------------------------------------------

const TranslateLandscape = () => {
  const {IsMaxLength, TargetText, SourceText} = useSelector(
    state => state.translateReducer,
  );

  const translateDispatch = useDispatch();

  const [SOURCE_TEXT, setSOURCE_TEXT] = useState(SourceText);
  const [TARGET_TEXT, setTARGET_TEXT] = useState(TargetText);

  const [MODAL_VISIBILITY, set_MODAL_VISIBILITY] = useState(false);

  const [MODAL_X, set_MODAL_X] = useState(0);
  const [MODAL_Y, set_MODAL_Y] = useState(0);

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

  const CopyTargetText = evt => {
    // Clipboard.setString(TARGET_TEXT);
    // ToastAndroid.show('Copied', ToastAndroid.SHORT);
    console.log(`x coord = ${evt.nativeEvent.locationX}`);
    console.log(`y coord = ${evt.nativeEvent.locationY}`);

    console.log(SCREEN.WIDTH);
    console.log(SCREEN.HEIGHT);

    set_MODAL_X(evt.nativeEvent.locationX);
    set_MODAL_Y(evt.nativeEvent.locationY);

    set_MODAL_VISIBILITY(true);
    setTimeout(() => {
      set_MODAL_VISIBILITY(false);
    }, 3000);
  };

  const ChangeTargetInputText = async text => {
    if (text === '') {
      setTARGET_TEXT('');
    }
    setSOURCE_TEXT(text);
    setTARGET_TEXT(text);

    checkMaxLength(text);
    console.log(text);
  };

  return (
    <View style={styles.main}>
      <View style={styles.transalateContainer}>
        <View style={styles.externalContainerLeft}>
          <View style={styles.internalContainerLeft}>
            <TextInput
              multiline
              keyboardType="default"
              style={styles.internalInputText}
              value={SOURCE_TEXT}
              onChangeText={e => ChangeTargetInputText(e)}
              placeholder={DEFAULT_TEXT.INPUT_TEXT}
              selectionColor={COLOR.ActiveText}
              maxLength={DEFAULT_TEXT.MAX_LENGTH}
            />
          </View>
        </View>
        <View style={styles.externalContainerRight}>
          <Pressable
            style={styles.internalContainerRight}
            onLongPress={evt =>
              TARGET_TEXT === '' ? {} : CopyTargetText(evt)
            }>
            <ScrollView
              ref={ref => {
                this.scrollView = ref;
              }}
              contentContainerStyle={styles.scrollContainer}
              onContentSizeChange={() =>
                this.scrollView.scrollToEnd({animated: true})
              }>
              <Text style={styles.internalText}>{TARGET_TEXT}</Text>
            </ScrollView>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  transalateContainer: {
    flex: 4,
    flexDirection: 'row',
    marginTop: SCREEN.HEIGHT / 60,
  },
  externalContainerLeft: {
    flex: 4,
    backgroundColor: COLOR.ExternalColor,
    borderRadius: 20,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    marginRight: 10,
  },
  externalContainerRight: {
    flex: 4,
    backgroundColor: COLOR.ExternalColor,
    borderRadius: 20,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
  },
  internalContainerLeft: {
    flex: 4,
    backgroundColor: COLOR.InternalColor,
    borderRadius: 15,

    borderBottomRightRadius: 7,
    borderTopRightRadius: 7,
    margin: 10,
  },
  internalContainerRight: {
    flex: 4,
    backgroundColor: COLOR.InternalColor,
    borderRadius: 15,

    borderBottomLeftRadius: 7,
    borderTopLeftRadius: 7,
    margin: 10,
  },
  internalInputText: {
    flex: 4,
    width: SCREEN.WIDTH - 60,

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
  },
  modalContainer: {
    // rectangle setup
    borderRadius: 15,

    backgroundColor: 'yellow',

    // sizing
    height: SCREEN.HEIGHT / 7 / 2.5,
    width: (SCREEN.WIDTH - 40) / 2,

    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});

export default TranslateLandscape;
