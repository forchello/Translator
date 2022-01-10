import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';

export const micro_permission_ios = async () => {
  try {
    const result = await request(PERMISSIONS.IOS.MICROPHONE);

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
