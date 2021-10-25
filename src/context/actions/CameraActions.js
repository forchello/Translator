export const SET_PICTURE_IS_TAKED = 'SET_PICTURE_IS_TAKED';
export const SET_PICTURE_URI = 'SET_PICTURE_URI';

export const setPictureIsTaked = PictureIsTaked => dispatch => {
  dispatch({
    type: SET_PICTURE_IS_TAKED,
    payload: PictureIsTaked,
  });
};

export const setPictureURI = PictureURI => dispatch => {
  dispatch({
    type: SET_PICTURE_URI,
    payload: PictureURI,
  });
};
