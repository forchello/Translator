export const SET_TARGET_LANG = 'SET_TARGET_LANG';
export const SET_SOURCE_LANG = 'SET_SOURCE_LANG';

export const setTargetLang = TargetLang => dispatch => {
  dispatch({
    type: SET_TARGET_LANG,
    payload: TargetLang,
  });
};

export const setSourceLang = SourceLang => dispatch => {
  dispatch({
    type: SET_SOURCE_LANG,
    payload: SourceLang,
  });
};
