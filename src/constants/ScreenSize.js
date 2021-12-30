import {StatusBar, Dimensions} from 'react-native';

export default {
  WIDTH: Dimensions.get('window').width,
  HEIGHT: Dimensions.get('window').height,

  STATUS_BAR_HEIGHT: StatusBar.currentHeight + 10,

  isPortrait() {
    const dim = Dimensions.get('screen');
    return dim.width <= dim.height;
  },

  isLandscape() {
    const dim = Dimensions.get('screen');
    return dim.width >= dim.height;
  },
};
