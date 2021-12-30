import {
  SET_CAMERA_STATE,
  SET_PICTURE_IS_TAKED,
  SET_PICTURE_URI,
} from '../actions/CameraActions';
import {InitialCamera} from '../initialsStates/CameraStates';

const cameraReducer = (state = InitialCamera, action) => {
  switch (action.type) {
    case SET_CAMERA_STATE:
      return {...state, CameraState: action.payload};
    case SET_PICTURE_IS_TAKED:
      return {...state, PictureIsTaked: action.payload};
    case SET_PICTURE_URI:
      return {...state, PictureURI: action.payload};
    default:
      return {...state};
  }
};

export default cameraReducer;
