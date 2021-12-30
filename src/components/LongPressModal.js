import {View, Text, StyleSheet} from 'react-native';

import COLOR from '../constants/Colors';
import SCREEN from '../constants/ScreenSize';

const LongPressModal = () => {
  //   return (
  //     <View style={{flex: 1}}>
  //       <View style={styles.modalContainer}>
  //         <Text> modal </Text>
  //       </View>
  //     </View>
  //   );
  //   alert('hello');
};

const styles = StyleSheet.create({
  modalContainer: {
    // rectangle setup
    // backgroundColor: COLOR.InternalColor,
    borderRadius: 15,
    // backgroundColor: 'black',
    backgroundColor: 'transparent',

    // sizing
    // flex: 1,
    height: SCREEN.HEIGHT / 7 / 2.5,
    width: (SCREEN.WIDTH - 40) / 5,

    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LongPressModal;
