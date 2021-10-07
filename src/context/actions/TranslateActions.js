export const SET_TARGET_TEXT = 'SET_TARGET_TEXT';
export const SET_SOURCE_TEXT = 'SET_SOURCE_TEXT';
export const SET_IS_MAX_LENGTH = 'SET_IS_MAX_LENGTH';

export const setTargetText = TargetText => dispatch => {
  dispatch({
    type: SET_TARGET_TEXT,
    payload: TargetText,
  });
};

export const setSourceText = SourceText => dispatch => {
  dispatch({
    type: SET_SOURCE_TEXT,
    payload: SourceText,
  });
};

export const setIsMaxLength = IsMaxLength => dispatch => {
  dispatch({
    type: SET_IS_MAX_LENGTH,
    payload: IsMaxLength,
  });
};
