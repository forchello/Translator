import React from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  Text,
  LogBox,
  Dimensions,
} from 'react-native';

import Header from './Header';
import TranslateLandscape from './TranslateLandscape';

import COLOR from '../../constants/Colors';
import SCREEN from '../../constants/ScreenSize';

const HomeLandscape = ({navigation}) => {
  return (
    <View style={styles.mainContainer}>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle={'light-content'}
      />
      <View style={styles.statusbar} />
      <Header navigation={navigation} />
      <TranslateLandscape />
    </View>
  );
};

const styles = StyleSheet.create({
  statusbar: {
    height: SCREEN.STATUS_BAR_HEIGHT,
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COLOR.ActiveText,

    padding: 10,
  },
  header: {
    flex: 1,
    backgroundColor: 'yellow',
  },
});

export default HomeLandscape;
