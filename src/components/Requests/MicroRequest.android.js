import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';

export const micro_permission_android = async () => {
  try {
    const result = await request(PERMISSIONS.ANDROID.RECORD_AUDIO);

    if (result === RESULTS.GRANTED) {
      console.log('micro granted');
      return true;
    }

    console.log('micro denied');
    return false;
  } catch (e) {
    console.log(e);
  }
};
