import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import Toast from 'react-native-simple-toast';

export const camera_permission_ios = async ({navigation}) => {
  try {
    const result = await check(PERMISSIONS.IOS.CAMERA);

    if (result === RESULTS.GRANTED) {
      console.log('camera granted');
      navigation.navigate('CameraScreen');
    } else {
      console.log('camera denied');
      request(PERMISSIONS.IOS.CAMERA)
        .then(request_result => {
          if (request_result === RESULTS.GRANTED) {
            console.log('camera granted');
            navigation.navigate('CameraScreen');
          } else {
            console.log('camera denied');
            Toast.show('You denied camera');
            navigation.navigate('CameraError');
          }
        })
        .catch(e => console.log(e));
    }
  } catch (e) {
    console.log(e);
  }
};
